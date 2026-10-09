/**
 * LOCKING — Control who may read/write a row (or key) while a transaction is in flight.
 *
 * Interview: "Optimistic vs pessimistic locking?"
 * Answer: Optimistic uses a version and retries on conflict (see concurrency.js).
 *         Pessimistic takes a lock up front so others wait — use for hot rows (wallets, last seat).
 *
 * Lock types (SQL):
 *   SHARED (S)     — many readers; no writers. SELECT ... FOR SHARE
 *   EXCLUSIVE (X)  — one writer; no other readers/writers of that row. SELECT ... FOR UPDATE
 *   ROW vs TABLE   — prefer row locks. Table locks kill concurrency (DDL, LOCK TABLE)
 *   ADVISORY       — app-level lock keyed by an integer (Postgres pg_advisory_lock)
 *
 * MongoDB:
 *   - WiredTiger: document-level locks; no SELECT FOR UPDATE
 *   - Atomicity: findOneAndUpdate, $inc, $set with a filter
 *   - Distributed lock: Redis SET key NX PX ttl (Redlock if you must; prefer single Redis)
 *
 * Deadlock: A waits for B's lock, B waits for A's. Engine aborts one txn — your app MUST retry.
 *
 * Rules of thumb:
 *   1. Lock as late as possible, release as early as possible (keep txn short)
 *   2. Always lock rows in the same order (e.g. lower account id first) to avoid deadlocks
 *   3. Never hold a DB lock while calling Stripe/HTTP
 *   4. Set lock_timeout / statement_timeout so waiters don't hang forever
 *
 * Trade-offs:
 *   + Prevents lost updates on hot data
 *   - Wait time, deadlocks, reduced throughput if overused
 */

const LOCK = { SHARED: 'SHARED', EXCLUSIVE: 'EXCLUSIVE' };

class LockManager {
  constructor() {
    // resource → { mode, owners: Set }
    this.held = new Map();
    this.waiters = []; // queue of { resource, mode, owner, resolve, reject }
  }

  async acquire(owner, resource, mode) {
    if (this.#canGrant(resource, mode, owner)) {
      this.#grant(resource, mode, owner);
      console.log(`  [${owner}] acquired ${mode} on ${resource}`);
      return;
    }
    const holders = [...this.held.get(resource).owners].join(', ');
    console.log(`  [${owner}] WAITING for ${mode} on ${resource} (held by ${holders})`);
    await new Promise((resolve, reject) => {
      this.waiters.push({ resource, mode, owner, resolve, reject });
    });
    this.#grant(resource, mode, owner);
    console.log(`  [${owner}] acquired ${mode} on ${resource} (after wait)`);
  }

  release(owner, resource) {
    const current = this.held.get(resource);
    if (!current || !current.owners.has(owner)) return;
    current.owners.delete(owner);
    if (current.owners.size === 0) this.held.delete(resource);
    console.log(`  [${owner}] released ${resource}`);
    this.#wake(resource);
  }

  releaseAll(owner) {
    for (const resource of [...this.held.keys()]) {
      this.release(owner, resource);
    }
  }

  #grant(resource, mode, owner) {
    const current = this.held.get(resource);
    if (!current) {
      this.held.set(resource, { mode, owners: new Set([owner]) });
      return;
    }
    current.owners.add(owner);
  }

  #canGrant(resource, mode, owner) {
    const current = this.held.get(resource);
    if (!current) return true;
    if (current.owners.has(owner)) return true; // re-entrant for this demo
    // Two SHARED locks can coexist; EXCLUSIVE never shares
    return current.mode === LOCK.SHARED && mode === LOCK.SHARED;
  }

  #wake(resource) {
    const idx = this.waiters.findIndex((w) => w.resource === resource);
    if (idx === -1) return;
    const waiter = this.waiters[idx];
    if (!this.#canGrant(resource, waiter.mode, waiter.owner)) return;
    this.waiters.splice(idx, 1);
    waiter.resolve();
  }

  /**
   * Naive deadlock detector: wait-for cycle (A waits for B, B waits for A).
   * Real engines do this continuously and abort one victim.
   */
  detectDeadlock() {
    const waitsFor = new Map(); // owner → one holder of the resource they want
    for (const w of this.waiters) {
      const lock = this.held.get(w.resource);
      const holder = lock ? [...lock.owners][0] : null;
      if (holder) waitsFor.set(w.owner, holder);
    }

    for (const start of waitsFor.keys()) {
      const seen = new Set();
      let cur = start;
      while (cur && !seen.has(cur)) {
        seen.add(cur);
        cur = waitsFor.get(cur);
        if (cur === start) {
          return [...seen];
        }
      }
    }
    return null;
  }

  abort(owner) {
    this.waiters = this.waiters.filter((w) => {
      if (w.owner !== owner) return true;
      w.reject(new Error(`Deadlock victim: ${owner} aborted`));
      return false;
    });
    this.releaseAll(owner);
    console.log(`  [ENGINE] aborted ${owner} (deadlock victim) — app should retry`);
  }
}

class AccountStore {
  constructor(locks) {
    this.locks = locks;
    this.rows = new Map();
  }

  seed(id, balance) {
    this.rows.set(id, { balance });
  }

  async lockAndRead(txn, id) {
    await this.locks.acquire(txn, `account:${id}`, LOCK.EXCLUSIVE);
    return this.rows.get(id);
  }

  write(id, balance) {
    this.rows.set(id, { balance });
  }
}

// Pessimistic transfer: lock both accounts, then update (always lock lower id first)
async function lockedTransfer(store, txn, from, to, amount) {
  const [first, second] = from < to ? [from, to] : [to, from];
  try {
    const a = await store.lockAndRead(txn, first);
    const b = await store.lockAndRead(txn, second);
    const fromRow = from === first ? a : b;
    const toRow = to === first ? a : b;
    if (fromRow.balance < amount) throw new Error('Insufficient funds');
    store.write(from, fromRow.balance - amount);
    store.write(to, toRow.balance + amount);
    console.log(`  [${txn}] transferred ${amount} ${from} → ${to}`);
  } finally {
    store.locks.releaseAll(txn);
  }
}

async function deadlockScenario() {
  const locks = new LockManager();
  const store = new AccountStore(locks);
  store.seed('A', 100);
  store.seed('B', 100);

  console.log('\n--- Deadlock: opposite lock order ---');
  console.log('Txn1 locks A then wants B. Txn2 locks B then wants A.');

  const t1 = (async () => {
    await store.lockAndRead('Txn1', 'A');
    await delay(40);
    await store.lockAndRead('Txn1', 'B'); // waits for Txn2
    store.locks.releaseAll('Txn1');
  })();

  const t2 = (async () => {
    await delay(10);
    await store.lockAndRead('Txn2', 'B');
    await delay(40);
    await store.lockAndRead('Txn2', 'A'); // waits for Txn1
    store.locks.releaseAll('Txn2');
  })();

  await delay(80);
  const cycle = locks.detectDeadlock();
  console.log('  Cycle:', cycle ? cycle.join(' → ') + ' → ' + cycle[0] : 'none');
  if (cycle) locks.abort(cycle[0]);

  await Promise.allSettled([t1, t2]);
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const SQL_SKETCH = `
-- Pessimistic (hot wallet / last item)
BEGIN;
  SELECT balance FROM accounts WHERE id = 'alice' FOR UPDATE;  -- exclusive row lock
  UPDATE accounts SET balance = balance - 50 WHERE id = 'alice';
  UPDATE accounts SET balance = balance + 50 WHERE id = 'bob';
COMMIT;

-- Shared lock: other readers OK, writers wait
SELECT * FROM reports WHERE day = CURRENT_DATE FOR SHARE;

-- Mongo equivalent of "lock + update": one atomic command, not a lock you hold
db.tickets.findOneAndUpdate(
  { _id: ticketId, stock: { $gte: 1 } },
  { $inc: { stock: -1 } }
);

-- Redis mutex (distributed, short TTL — never lock forever)
SET lock:order:42 <token> NX PX 5000
-- do work, then delete only if token still matches (Lua)
`;

// --- Demo ---
(async () => {
  console.log('═══════════════════════════════════════');
  console.log('LOCKING');
  console.log('═══════════════════════════════════════');

  const locks = new LockManager();
  const store = new AccountStore(locks);
  store.seed('alice', 200);
  store.seed('bob', 50);

  console.log('\n--- Pessimistic: two transfers, same accounts, consistent lock order ---');
  await Promise.all([
    lockedTransfer(store, 'Txn-pay', 'alice', 'bob', 30),
    lockedTransfer(store, 'Txn-refund', 'alice', 'bob', 10),
  ]);
  console.log('Balances:', {
    alice: store.rows.get('alice').balance,
    bob: store.rows.get('bob').balance,
  });

  console.log('\n--- Shared locks coexist; exclusive waits ---');
  const lm = new LockManager();
  await Promise.all([
    lm.acquire('Reader1', 'row:1', LOCK.SHARED),
    lm.acquire('Reader2', 'row:1', LOCK.SHARED),
  ]);
  const writer = lm.acquire('Writer', 'row:1', LOCK.EXCLUSIVE);
  await delay(20);
  lm.release('Reader1', 'row:1');
  lm.release('Reader2', 'row:1');
  await writer;
  lm.release('Writer', 'row:1');

  await deadlockScenario();

  console.log('\nSQL / Mongo / Redis sketches:');
  console.log(SQL_SKETCH);

  console.log('--- Interview one-liners ---');
  console.log('FOR UPDATE        = exclusive row lock until COMMIT/ROLLBACK');
  console.log('Deadlock          = cycle in wait-for graph; retry the aborted txn');
  console.log('Lock order        = always lock account ids sorted to prevent cycles');
  console.log('Don\'t lock + HTTP = hold DB locks only for in-DB work');
})();
