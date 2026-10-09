
// setTimeout(callback, delay, arg1, arg2, ...)
// callback: The function to execute after the delay.
// delay: Time in milliseconds before the callback is invoked.
// arg1, arg2, ...: Optional arguments to pass to the callback when it runs.



// let promise= new Promise(function(resolve,reject){
//     setTimeout(function(){
//           resolve("timeer finished")
//     },1000)
// })

// promise.then(function(data){
//     console.log(data)
// })


let promise= new Promise(function(resolve,reject){
    setTimeout(resolve,1000,"timerfinished")
})
// we written using the arrow function it can be done based done prefernce of writing the code
promise.then((data)=>{console.log(data)})
promise.then(data=>console.log(data))