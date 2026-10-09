const arr=[1,2,3,4,5];
// console.log(typeof arr); // object
// console.log(typeof Array)
// console.log(arr.__proto__ === Array.prototype); // []

// console.log(Array.prototype.__proto__ === Object.prototype); // true
// console.log(Array.prototype === Function.prototype);
// class Abc{
//     constructor(){
//         this.a=10;
//     }
// }
// console.log(Abc.prototype===Object.prototype)
// console.log(Abc.__proto__===Function.prototype)
// console.log(Abc.__proto__.__proto__===Object.prototype)
// console.log(Object.__proto__)
// console.log(Object.prototype)
// console.log(Object.prototype.__proto__)
// console.log(typeof Abc); // function


// function Array(){

// }
const ar= new Array(["1","2","3","4","5"]);
console.log(ar.__proto__);

function add(a,b){
    this.a=a
    this.b=b
}
const add1=new add(10,20);

console.log(add1.__proto__);
console.log(add1.__proto__=== add.prototype);
console.log(add1.__proto__=== Object.prototype);
console.log(add1.__proto__.__proto__=== Object.prototype);
console.log(add1 instanceof add);
console.log(add1 instanceof Object);
console.log(add1.constructor);
console.log(add.prototype===Function.prototype);
console.log(add.__proto__===Function.prototype);
//please try to understand this
console.log(add.prototype.__proto__===Object.prototype);
console.log(typeof add.__proto__);
console.log(typeof add.prototype);
// console.log(add.__proto__.__proto__===Function.prototype.__proto__);
// console.log(add.__proto__.__proto__===Object.prototype);