const fs=require("node:fs")

fs.readFile("./promise.txt","utf-8",(err,data)=>{
   if(err){
    console.log("err",err)
    return
   }
   console.log(data)
})

// how can we can customise this function to resolve a prmoise

function readFileCustomisedFunc(filepath){
    return new Promise(function(resolve,reject){
        fs.readFile(filepath,"utf-8",(err,data)=>{
            if(err){
                // console.log("error",err)
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

readFileCustomisedFunc("./promise.txt")
.then((filedata)=>{
    console.log(filedata)
})