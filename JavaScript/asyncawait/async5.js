
const p1=new Promise((resolve,reject)=>{
    setTimeout(resolve,20000,"p1 is resolved")
})
const p2=new Promise((resolve,reject)=>{
   setTimeout(resolve,40000,"p2 is resolved")
})
async function getData(){
   console.log("hello")
   let val1=await p1
   console.log("Namaste javascript1")
   console.log("the value of p1",val1)
   let val2=await p2
   console.log("Namaste javascript2")
   console.log("the value of p1",val2)
   return "All promises are resolved"
}
getData()
console.log("Main thread is not blocked!")
