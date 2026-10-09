function a(){
    console.log('a called');
    let jk=10;
}
a.prototype.name="John";
a.prototype.age=30;
a.prototype.getName=function(){
    return this.name;
}
a.prototype.getAge=function(){
    return this.age;
}   
// console.log(a.prototype);
// console.log(a.__proto__);
// console.log(a.prototype.__proto__);
// console.log(a.__proto__.__proto__);
// console.log(a.__proto__===Function.prototype);
const a1=new a();
a1.name="mahesh"
console.log(a1); // John
console.log(a1.name); // John
console.log(a1.age); // 30
console.log(a1.prototype)
console.log(a1.__proto__)
console.log(a.prototype)
console.log(Object.getOwnPropertyNames(a.__proto__))
console.log(Object.getOwnPropertyNames(a.__proto__.__proto__))
console.log(a.__proto__===Function.prototype)
