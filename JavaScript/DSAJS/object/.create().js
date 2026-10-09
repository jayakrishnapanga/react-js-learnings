// Object.create(prototypeobject)
// with the help of it we can add the prototype for an object 

// here obj1 is an object then if we you want to add this as protoype any object 
// then in that case we will use object.create method
const obj1 = {
    name: "krishna",
    address: "hyderabad"
};

// Create obj2 with obj1 as its prototype
const obj2 = Object.create(obj1);
// what  will happen if you execute that line it will create object and it's prototype is set to obj1
// obj2={
//     __proto__:[[prototype]] // this prototype is the obj1 
// }

console.log(obj2.name); // "krishna"
console.log(obj2.address); // "hyderabad"


console.log(obj1)
console.log(obj2) // if you console it is an empty object but it's prototype property set to obj1
// i.e the reason we are getting output as true
console.log(obj2.__proto__ === obj1); // true ✅