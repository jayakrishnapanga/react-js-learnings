
let p1=new Promise((resolve,reject)=>{
     setTimeout(resolve,10000,"p1 is resolved")
})
let p2=new Promise((resolve,reject)=>{
    setTimeout(resolve,5000,"p2 is resolved")
})
// async function getData(){
//     console.log(p1)
//     let val1=await p1
//     console.log("Namaste javascript1")
//     console.log("the value of p1",val1)
//     console.log(p2)
//     let val2=await p2
//     console.log("Namaste javascript2")
//     console.log("the value of p2",val2)
// }
async function getData() {
    const [val1, val2] = Promise.all([p1, p2]);
    // console.log("Namaste javascript1");
    // console.log("the value of p1", val1);
    // console.log("Namaste javascript2");
    // console.log("the value of p2", val2);
  }
  
getData();
  
