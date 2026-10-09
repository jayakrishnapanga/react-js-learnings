const promise = new Promise((resolve, reject) => {
  console.log('Inside executor');
  resolve('OK!');
});


// What happens?

// 1️⃣ The Promise constructor runs immediately.
// 2️⃣ The executor function (resolve, reject) => {} is run immediately on the current call stack.
// 3️⃣ The resolve and reject you see are special functions created by V8’s Promise implementation.

// They change the internal state from pending → fulfilled or rejected.
// They store the value to be delivered later.

// ✅ 2️⃣ When does resolve() run?
// It runs whenever your executor calls it — but the .then callbacks don’t run immediately.
// Instead, resolve() schedules all .then handlers into the microtask queue.
// The microtasks run after the current call stack finishes, not right away.
// ➡️ This ensures predictable, consistent ordering.


// ✅ 3️⃣ How the microtask queue works
// V8 implements the ECMAScript spec:

// When a Promise is resolved:
// → the reaction handlers (.then callbacks) are added to the microtask queue.
// The microtask queue is separate from the Event Loop phases (macrotasks).

// When the current JS stack is empty, V8 checks: “Do I have any microtasks?”
// If yes, it runs all of them before moving to the next Event Loop phase (like timers, I/O).


// JS Call Stack:
//   [ sync code runs ]

// Promise.resolve() called:
//   V8 sets state to fulfilled
//   V8 schedules `.then` callback → microtask queue

// Current stack empty?
//   ✔️ Run all microtasks!

// Event Loop phases run next.


new Promise((resolve, reject) => {
  // This is the executor function.
  // It runs IMMEDIATELY when you create the Promise.
})

// | Step | What happens?                                                                                          | Who does it? |
// | ---- | ------------------------------------------------------------------------------------------------------ | ------------ |
// | 1️⃣  | V8 allocates a new `Promise` object in its JS heap.                                                    | V8           |
// | 2️⃣  | The constructor calls the executor function you pass in, **right away**, on the current JS call stack. | V8           |
// | 3️⃣  | V8 automatically passes in **two special functions**: `resolve` and `reject`.                          | V8           |
// | 4️⃣  | You can call `resolve(value)` or `reject(error)` to settle the Promise.                                | Your code    |
// | 5️⃣  | `.then` handlers are put on the microtask queue when the Promise is resolved/rejected.                 | V8           |
