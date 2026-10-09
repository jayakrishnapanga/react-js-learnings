const obj1 = {
  name: "krishna",
  address: "hyderabad",
};

// Create obj2 with obj1 as its prototype
const obj2 = Object.create(obj1);

console.log(obj2.name); // "krishna"
console.log(obj2.address); // "hyderabad"
// console.log(obj2.__proto__ === obj1); // true ✅

console.log(obj1);
console.log(obj2);
console.log(obj1.__proto__)