async function getdata(){
    setTimeout(()=>{
        console.log("i am not executed for 3secs")
    },3000)
    return("some data has return")
}

const p1= getdata().then((result)=>{
    console.log(result)
})
console.log(p1)