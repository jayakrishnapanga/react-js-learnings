
// await does not block the main thread. 
// Instead, it pauses the execution of the function containing it, allowing the event loop to continue processing other tasks while waiting for the Promise to resolve.
// This is the essence of JavaScript's non-blocking, asynchronous programming model.

const p1 = new Promise((resolve) => {
    setTimeout(resolve, 3000, "p1 resolved");
});

async function getData() {
    console.log("Start getData");
    let val1 = await p1;
    console.log("After await:", val1);
}

getData();
console.log("Main thread is not blocked!");
