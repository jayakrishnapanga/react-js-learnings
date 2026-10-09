const obj1=new Object();    
obj1.name="John";
obj1.age=30;
console.log(obj1.name); // John
console.log(obj1.age); // 30    
console.log(obj1); // { name: 'John', age: 30 }
console.log(typeof obj1); // object
console.log(obj1.constructor); // [Function: Object]
console.log(obj1 instanceof Object); // true
console.log(obj1.hasOwnProperty('name')); // true
console.log(obj1.hasOwnProperty('age')); // true
console.log(obj1.hasOwnProperty('salary')); // false
console.log(obj1.__proto__); // {}
console.log(obj1.__proto__ === Object.prototype); // true
console.log(Object.prototype); // {}
console.log(Object.prototype.__proto__); // null
console.log(Object.getOwnPropertyNames(Object.prototype))
console.log(Object.getOwnPropertyNames(obj1.__proto__))
console.log(Object.getOwnPropertyNames(obj1))