
// await does not block the main thread. 
// Instead, it pauses the execution of the function containing it, allowing the event loop to continue processing other tasks while waiting for the Promise to resolve.
// This is the essence of JavaScript's non-blocking, asynchronous programming model.

const p1=new Promise((resolve,reject)=>{
    setTimeout(resolve,60000,"p1 is resolved")
})
const p2=new Promise((resolve,reject)=>{
   setTimeout(resolve,40000,"p2 is resolved")
})
async function getData(){
   console.log("hello")
   let val1=await p1
   let val3=await p1
   console.log(val3)
   console.log("Namaste javascript1")
   console.log("the value of p1",val1)
   let val2=await p2
   console.log("Namaste javascript2")
   console.log("the value of p1",val2)
}

getData()