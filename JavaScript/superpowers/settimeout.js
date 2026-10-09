
// setTimeout(callback, delay, arg1, arg2, ...)
// callback: The function to execute after the delay.
// delay: Time in milliseconds before the callback is invoked.
// arg1, arg2, ...: Optional arguments to pass to the callback when it runs.



// How It Works in This Case
// In your example:

// setTimeout(resolve, 100, 'foo');
// resolve is the callback function (from the Promise).
// 100 is the delay in milliseconds.
// 'foo' is the argument passed to the resolve function when it is executed.
// This means after 100 milliseconds, resolve will be called as:

// resolve('foo');
// This behavior is useful when you want to pass predefined arguments to the callback function without creating an additional closure.





const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});