console.log(typeof null)
console.log(typeof undefined)
function a(){
    var b=33
    c();
    function c(){
        console.log(b)
    }
}
console.log(typeof a)
console.log(a.prototype)
console.log(typeof a.prototype)

class demo{
    constructor(){
        console.log("hello")
    }
}
console.log(typeof demo)
let num=20
let num2=Number(20)
let num3= new Number(20)
console.log(typeof num)
console.log(typeof num2)
console.log(typeof num3)