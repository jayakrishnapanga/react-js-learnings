
console.log("For loop")
for(let i=0;i<5;i++){
    setTimeout(function(){
     console.log(`log after i seconds ${i}`)
    },i*1000)
}