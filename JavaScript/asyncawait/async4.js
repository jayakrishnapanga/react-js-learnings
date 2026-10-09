const p1=new Promise((resolve,reject)=>{
    setTimeout(resolve,10000,"p1 is resolved")
})
async function getData(){
   let val1=await p1
   console.log("Namaste javascript1")
   console.log("the value of p1",val1)
   let val2=await p1
   console.log("Namaste javascript2")
   console.log("the value of p1",val2)
}

getData()