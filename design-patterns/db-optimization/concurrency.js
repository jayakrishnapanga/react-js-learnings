/**
 * CONCURRENCY — Two requests hit the same row at the same time. Who wins, and is money/stock correct?
 *
 * Interview: "Two users buy the last ticket. How do you prevent overselling?"
 * Answer: Don't do read-then-write in the app. Use an atomic DB update, a version check
 *         (optimistic), or a lock (pessimistic). See locking.js for lock types.
 *
 * Classic bugs (name these):
 *   1. Lost update     — both read 10, both write 11; one increment vanished
 *   2. Dirty read      — you read a value that later rolls back
 *   3. Non-repeatable  — same SELECT twice in one txn, different value
 *   4. Phantom         — second SELECT finds extra rows matching the same WHERE
 *   5. Write skew      — each txn's writes look valid alone; together they break an invariant
 *
 * Two strategies:
 *   OPTIMISTIC  — assume no clash; commit if version/etag still matches; retry on conflict
 *   PESSIMISTIC — lock the row first (SELECT FOR UPDATE); others wait
 *
 * MERN:
 *   - Mongo: findOneAndUpdate + $inc / $set with filter on version or stock > 0
 *   - Postgres: UPDATE ... WHERE stock > 0 RETURNING *; or version column
 *   - Node is single-threaded but concurrent: two await-ing requests interleave around I/O
 *
 * Trade-offs:
 *   Optimistic: better under low contention; retries under high contention
 *   Pessimistic: safer for hot rows (wallet, last seat); more lock wait / deadlock risk
 */

class Inventory {
  constructor(stock) {
    this.stock = stock;
    this.version = 1; // optimistic concurrency token
  }
}

// ❌ Lost update: read, think, write — two checkouts both think stock was 1
async function unsafeCheckout(store, buyer) {
  const current = store.stock; // read
  await delay(30); // simulate network / business logic — the race window
  if (current < 1) {
    console.log(`  [${buyer}] sold out (saw ${current})`);
    return false;
  }
  store.stock = current - 1; // write based on stale snapshot
  console.log(`  [${buyer}] bought. stock now ${store.stock} (based on stale ${current})`);
  return true;
}

// ✅ Atomic conditional update — DB does check+decrement in one step
function atomicCheckout(store, buyer) {
  // Models: UPDATE tickets SET stock = stock - 1 WHERE id = ? AND stock >= 1
  //    or:  findOneAndUpdate({ stock: { $gte: 1 } }, { $inc: { stock: -1 } })
  if (store.stock < 1) {
    console.log(`  [${buyer}] atomic: sold out`);
    return false;
  }
  store.stock -= 1;
  console.log(`  [${buyer}] atomic: bought. stock now ${store.stock}`);
  return true;
}

// ✅ Optimistic locking with a version column
function optimisticCheckout(store, buyer, snapshot) {
  // Models: UPDATE ... SET stock = stock - 1, version = version + 1
  //         WHERE id = ? AND version = $snapshot.version AND stock >= 1
  if (store.version !== snapshot.version) {
    console.log(
      `  [${buyer}] conflict: version ${snapshot.version} stale (db is ${store.version}) — retry`
    );
    return { ok: false, reason: 'version_conflict' };
  }
  if (store.stock < 1) {
    console.log(`  [${buyer}] optimistic: sold out`);
    return { ok: false, reason: 'sold_out' };
  }
  store.stock -= 1;
  store.version += 1;
  console.log(`  [${buyer}] optimistic: bought. stock=${store.stock} version=${store.version}`);
  return { ok: true };
}

async function optimisticCheckoutWithRetry(store, buyer, { maxAttempts = 3 } = {}) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const snapshot = { stock: store.stock, version: store.version };
    await delay(10); // another request may commit in this window
    const result = optimisticCheckout(store, `${buyer}#${attempt}`, snapshot);
    if (result.ok || result.reason === 'sold_out') return result;
  }
  return { ok: false, reason: 'retries_exhausted' };
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Write skew: two doctors each leave, both see "2 on call", both go off duty → 0 left
function writeSkewDemo() {
  const onCall = new Set(['Dr A', 'Dr B']);
  const minRequired = 1;

  function goOffDuty(name, currentlyOnCall) {
    const others = [...currentlyOnCall].filter((n) => n !== name);
    if (others.length >= minRequired) {
      currentlyOnCall.delete(name);
      console.log(`  ${name} left. On call: ${[...currentlyOnCall].join(', ') || '(nobody)'}`);
      return true;
    }
    console.log(`  ${name} cannot leave — would drop below ${minRequired}`);
    return false;
  }

  console.log('\nWrite skew (each txn used a stale "2 on call" snapshot):');
  const snapshotForA = new Set(onCall);
  const snapshotForB = new Set(onCall);
  goOffDuty('Dr A', snapshotForA);
  goOffDuty('Dr B', snapshotForB);
  // Merge writes into real table — both deletes apply
  onCall.delete('Dr A');
  onCall.delete('Dr B');
  console.log(`  Real table now: ${[...onCall].join(', ') || '(nobody)'}  ← invariant broken`);
  console.log('  Fix: SERIALIZABLE isolation, or lock the "on-call" predicate, or a constraint.');
}

// --- Demo ---
(async () => {
  console.log('═══════════════════════════════════════');
  console.log('CONCURRENCY');
  console.log('═══════════════════════════════════════');

  console.log('\n--- Lost update (unsafe read-then-write) ---');
  const unsafe = new Inventory(1);
  const [a, b] = await Promise.all([
    unsafeCheckout(unsafe, 'User A'),
    unsafeCheckout(unsafe, 'User B'),
  ]);
  console.log(`Sold ${Number(a) + Number(b)} tickets against stock of 1. Final stock: ${unsafe.stock}`);
  console.log('Both thought they won → oversold.');

  console.log('\n--- Atomic WHERE stock >= 1 ---');
  const atomic = new Inventory(1);
  // Sequential here to show the DB serializing the check; true atomicity is inside the engine
  atomicCheckout(atomic, 'User A');
  atomicCheckout(atomic, 'User B');

  console.log('\n--- Optimistic version check (no retry) ---');
  const opt = new Inventory(5);
  const snapA = { version: opt.version, stock: opt.stock };
  const snapB = { version: opt.version, stock: opt.stock };
  optimisticCheckout(opt, 'User A', snapA); // version 1 → 2
  optimisticCheckout(opt, 'User B', snapB); // still holding version 1 → conflict

  console.log('\n--- Optimistic with retry ---');
  const opt2 = new Inventory(2);
  await Promise.all([
    optimisticCheckoutWithRetry(opt2, 'User A'),
    optimisticCheckoutWithRetry(opt2, 'User B'),
  ]);
  console.log('Final:', { stock: opt2.stock, version: opt2.version });

  writeSkewDemo();

  console.log('\n--- Interview cheat sheet ---');
  console.log('Lost update fix #1: UPDATE SET stock = stock - 1 WHERE stock >= 1');
  console.log('Lost update fix #2: version / updatedAt column + retry');
  console.log('Lost update fix #3: SELECT FOR UPDATE (pessimistic) — see locking.js');
  console.log('Node race: two Express handlers can both await find() then both save()');
})();
