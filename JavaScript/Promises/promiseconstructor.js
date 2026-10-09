console.log("before");
const promise = new Promise((resolve, reject) => {
  console.log("i am executing right away");
  resolve("ok");
});
console.log("after");
promise.then((res) => {
  console.log("the promise is resolved", res);
});

console.log("hello man  finally ");



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

// 🧩 What is the executor for?
// The executor is where you start your async work:
// e.g. a timer, a file read, a network call, or some sync computation.

// You do your work inside it, then call resolve() or reject().


// ✔️ new Promise(executor)
// ✔️ Executor runs immediately, synchronously.
// ✔️ resolve() or reject() signal the result.
// ✔️ .then callbacks run later, via the microtask queue.



// So, what does the Promise do?
// ✅ It does not do the async work.
// ✅ It’s a pattern that holds the future result.
// ✅ It solves callback hell by:
    // Making chaining easier (.then().then().catch()).
    // Flattening deeply nested callbacks.
    // Making error handling consistent (.catch).



// ⚡️ How does this avoid callback hell?
// Before Promises:
getData(url, (err, data) => {
  if (err) return handleError(err);
  getMoreData(data, (err2, data2) => {
    if (err2) return handleError(err2);
    doSomething(data2, (err3, result) => {
      if (err3) return handleError(err3);
      console.log(result);
    });
  });
});

// With Promises:
getData(url)
  .then(data => getMoreData(data))
  .then(data2 => doSomething(data2))
  .then(result => console.log(result))
  .catch(err => handleError(err));

// new Promise() doesn’t magically make your code async.
// Your executor must start real async work (libuv, OS, Web APIs).
// The Promise holds the result until that work is done.
// .then gives you clean, chainable handling instead of nested callbacks.

