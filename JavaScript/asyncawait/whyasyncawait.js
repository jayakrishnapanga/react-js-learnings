// Why Use async/await Over .then()
// Cleaner and Readable Code:

// Using .then() creates a chain of callbacks which can become messy if there are multiple steps.
// async/await makes code look synchronous and easier to read.
// Error Handling:

// In .then(), error handling requires a separate .catch().
// With async/await, you can simply use try...catch, which centralizes error handling and improves code structure.
// Execution Flow:

// When you await a promise, it pauses the execution of the function until the promise resolves.
// In your example with handlePromise(), console.log("namaste javascript") runs immediately, even before the promise resolves

// async/await is a cleaner way to handle promises in JavaScript. It allows you to write asynchronous code that looks synchronous, making it easier to read and understand. It also simplifies error handling and improves the overall structure of your code.

const p=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("p is resolved")
    },10000)
})

async function getData(){
    let val=await p
    console.log("Namaste javascript")
    console.log("the value of p",val)
}

async function handlePromise(){
    p.then((res)=>{
      console.log(res)
    })
    console.log("namaste javascript")
}

handlePromise()