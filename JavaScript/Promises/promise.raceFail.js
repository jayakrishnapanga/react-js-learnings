let p1=new Promise((resolve,reject)=>{
    setTimeout(()=>{
       resolve("p1 has finished ")
    },3000)
})

let p2=new Promise((resolve,reject)=>{
setTimeout(()=>{
   reject("for testing intentionally thrown error")
},1000)
})

let p3=new Promise((resolve,reject)=>{
setTimeout(()=>{
   resolve("p3 has finished ")
},2000)
})

Promise.race([p1,p2,p3])
.then((values)=>{
console.log(values)
}).catch(err=>{
    console.log(err)
})