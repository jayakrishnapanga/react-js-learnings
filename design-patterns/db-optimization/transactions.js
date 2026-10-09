/**
 * TRANSACTIONS — Group multiple writes so they all succeed or all fail (atomicity).
 *
 * Interview: "You debit wallet A and credit wallet B. What if the process crashes mid-way?"
 * Answer: Wrap both writes in a transaction. COMMIT = both persist. ROLLBACK = neither does.
 *
 * ACID (say this in interviews):
 *   A — Atomicity: all or nothing
 *   C — Consistency: constraints/invariants hold after commit
 *   I — Isolation: concurrent txns don't see each other's dirty work (level-dependent)
 *   D — Durability: committed data survives crash
 *
 * MERN / databases:
 *   - PostgreSQL / MySQL: first-class transactions (BEGIN / COMMIT / ROLLBACK)
 *   - MongoDB: single-document writes are atomic; multi-document needs a replica set + session
 *   - Redis: MULTI/EXEC (not the same as ACID SQL txns)
 *
 * When you NEED a transaction:
 *   - Transfer money, inventory + order, "create user + profile" that must stay in sync
 * When you DON'T:
 *   - Single-document Mongo update, independent logs, eventual-consistency sagas across services
 *
 * Related: Saga (fullstack/saga.js) is for *distributed* work where 2PC/transactions can't span services.
 *
 * Trade-offs:
 *   + Correctness under crash and concurrency
 *   - Longer locks, more deadlocks, extra latency; Mongo multi-doc txns have limits
 */

// In-memory bank that models SQL-style transactions (BEGIN / COMMIT / ROLLBACK)
class TransactionalBank {
  constructor() {
    this.accounts = new Map(); // committed state
    this.nextTxnId = 1;
  }

  seed(id, balance) {
    this.accounts.set(id, { balance });
  }

  begin() {
    const id = this.nextTxnId++;
    return {
      id,
      snapshot: new Map(
        [...this.accounts.entries()].map(([k, v]) => [k, { ...v }])
      ),
      writes: new Map(),
      committed: false,
      aborted: false,
    };
  }

  getBalance(txn, accountId) {
    this.#assertOpen(txn);
    if (txn.writes.has(accountId)) return txn.writes.get(accountId).balance;
    const row = txn.snapshot.get(accountId) ?? this.accounts.get(accountId);
    if (!row) throw new Error(`Account ${accountId} not found`);
    return row.balance;
  }

  debit(txn, accountId, amount) {
    const next = this.getBalance(txn, accountId) - amount;
    if (next < 0) throw new Error(`Insufficient funds: ${accountId}`);
    txn.writes.set(accountId, { balance: next });
  }

  credit(txn, accountId, amount) {
    const next = this.getBalance(txn, accountId) + amount;
    txn.writes.set(accountId, { balance: next });
  }

  commit(txn) {
    this.#assertOpen(txn);
    for (const [id, row] of txn.writes) {
      this.accounts.set(id, { ...row });
    }
    txn.committed = true;
    console.log(`  [TXN ${txn.id}] COMMIT`);
  }

  rollback(txn) {
    if (txn.committed) throw new Error('Cannot rollback a committed txn');
    txn.aborted = true;
    console.log(`  [TXN ${txn.id}] ROLLBACK`);
  }

  #assertOpen(txn) {
    if (txn.committed || txn.aborted) throw new Error(`Txn ${txn.id} is closed`);
  }
}

function transfer(bank, from, to, amount, { failAfterDebit } = {}) {
  const txn = bank.begin();
  console.log(`  [TXN ${txn.id}] BEGIN transfer ${amount} ${from} → ${to}`);
  try {
    bank.debit(txn, from, amount);
    if (failAfterDebit) throw new Error('Crash after debit');
    bank.credit(txn, to, amount);
    bank.commit(txn);
    return { ok: true };
  } catch (err) {
    bank.rollback(txn);
    return { ok: false, error: err.message };
  }
}

// Isolation levels — what concurrent readers can see
const ISOLATION = {
  READ_UNCOMMITTED: {
    name: 'READ UNCOMMITTED',
    dirtyReads: true,
    nonRepeatableReads: true,
    phantomReads: true,
    note: 'Rarely used. Fast, but can read data that later rolls back.',
  },
  READ_COMMITTED: {
    name: 'READ COMMITTED',
    dirtyReads: false,
    nonRepeatableReads: true,
    phantomReads: true,
    note: 'Postgres default. Each statement sees only committed data; rows can change between statements.',
  },
  REPEATABLE_READ: {
    name: 'REPEATABLE READ',
    dirtyReads: false,
    nonRepeatableReads: false,
    phantomReads: true, // MySQL InnoDB actually prevents most phantoms; Postgres uses SNAPSHOT
    note: 'Same snapshot for the txn. Good for reports. MySQL default.',
  },
  SERIALIZABLE: {
    name: 'SERIALIZABLE',
    dirtyReads: false,
    nonRepeatableReads: false,
    phantomReads: false,
    note: 'Strictest. May abort with serialization errors — retry the txn.',
  },
};

function printIsolationCheatSheet() {
  console.log('\nIsolation levels (what can still go wrong):\n');
  console.log(
    'Level              | Dirty read | Non-repeatable | Phantom'
  );
  console.log('-------------------+------------+----------------+--------');
  for (const level of Object.values(ISOLATION)) {
    const yn = (v) => (v ? 'yes' : 'no ');
    console.log(
      `${level.name.padEnd(18)} | ${yn(level.dirtyReads).padEnd(10)} | ${yn(level.nonRepeatableReads).padEnd(14)} | ${yn(level.phantomReads)}`
    );
  }
  console.log('\nDirty read        = see uncommitted writes from another txn');
  console.log('Non-repeatable    = same row, two SELECTs, different values');
  console.log('Phantom           = same query, extra/missing rows the second time');
}

// What this looks like in real stacks (comments you can quote)
const REAL_WORLD = {
  postgres: `
    BEGIN;
      UPDATE accounts SET balance = balance - 100 WHERE id = 'A' AND balance >= 100;
      UPDATE accounts SET balance = balance + 100 WHERE id = 'B';
    COMMIT;  -- or ROLLBACK;
  `,
  mongoose: `
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await Wallet.updateOne({ _id: from }, { $inc: { balance: -amount } }, { session });
      await Wallet.updateOne({ _id: to }, { $inc: { balance: amount } }, { session });
      await session.commitTransaction();
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      session.endSession();
    }
  `,
};

// --- Demo ---
(function demo() {
  console.log('═══════════════════════════════════════');
  console.log('TRANSACTIONS');
  console.log('═══════════════════════════════════════');

  const bank = new TransactionalBank();
  bank.seed('alice', 200);
  bank.seed('bob', 50);

  console.log('\n--- Happy path: transfer 80 ---');
  console.log('Before:', { alice: bank.accounts.get('alice').balance, bob: bank.accounts.get('bob').balance });
  transfer(bank, 'alice', 'bob', 80);
  console.log('After:', { alice: bank.accounts.get('alice').balance, bob: bank.accounts.get('bob').balance });

  console.log('\n--- Crash after debit → ROLLBACK (balances unchanged) ---');
  const before = {
    alice: bank.accounts.get('alice').balance,
    bob: bank.accounts.get('bob').balance,
  };
  const result = transfer(bank, 'alice', 'bob', 40, { failAfterDebit: true });
  console.log('Error:', result.error);
  console.log('Still:', {
    alice: bank.accounts.get('alice').balance,
    bob: bank.accounts.get('bob').balance,
    unchanged: bank.accounts.get('alice').balance === before.alice,
  });

  printIsolationCheatSheet();

  console.log('\n--- Interview one-liners ---');
  console.log('Postgres default isolation:', ISOLATION.READ_COMMITTED.name);
  console.log('MySQL InnoDB default:', ISOLATION.REPEATABLE_READ.name);
  console.log('Mongo single doc:', 'atomic without a multi-doc transaction');
  console.log('Mongo multi-doc:', 'needs replica set + session.startTransaction()');
  console.log('\nPostgres sketch:', REAL_WORLD.postgres.trim());
})();
