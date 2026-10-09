// const p={
// }

// console.log(p.__proto__)
// console.log(Object.prototype)


// Function(){
//     prototype:{


//     }
// }
function demo(){
    // prototype{}
    // __proto__ function.protyp
    let a=10
}

demo.prototype.name="John"
demo.prototype.age=30   
demo.prototype.getName=function(){
    return this.name;
}
demo.prototype.getAge=function(){
    return this.age;
}
let demo1=new demo()
// console.log(demo1)
// console.log(demo1.age)
const arr=[1,2,3,4,5];

// console.log(arr.length)
console.log(demo)
console.log(demo.prototype)
// console.log(demo.__proto__)
console.log(demo1.__proto__)
console.log(demo1.__proto__===demo.prototype)
console.log(demo1.__proto__===Object.prototype)
console.log(demo1.__proto__.__proto__===Object.prototype)
console.log(demo.prototype.__proto__===Object.prototype)
console.log(demo.__proto__===Function.prototype)
// console.log(demo.__proto__===Object.prototype)
// console.log(demo.prototype===Function.prototype)