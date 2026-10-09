// what is the use of Object.assign()
// it will create a shallow copy 

// What is Object.assign?
// Object.assign is a method in JavaScript that copies the properties (both enumerable and own properties) from one or more source objects to a target object. It returns the modified target object.

// Object.assign(target, ...sources)
// target: The object to which properties will be copied.
// ...sources: One or more source objects whose properties will be copied to the target object.

// What does it do?
// Copies properties: It copies all enumerable and own properties from the source objects to the target object.

// Overwrites properties: If the target object already has a property with the same key, it will be overwritten by the value from the source object.

// Returns the target object: After copying, it returns the modified target object.

const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const result = Object.assign(target, source);

console.log(result); // { a: 1, b: 4, c: 5 }
console.log(target); // { a: 1, b: 4, c: 5 }


// In this example:

// The target object initially has properties a and b.

// The source object has properties b and c.

// After Object.assign, the target object gets the properties from the source object, and the value of b is overwritten.



// When to use Object.assign?
// 1.Merging Objects:
// Combine properties from multiple objects into a single object.

const obj1 = { a: 1 };
const obj2 = { b: 2 };
const merged = Object.assign({}, obj1, obj2);
console.log(merged); // { a: 1, b: 2 }

// 2.Cloning Objects:
// Create a shallow copy of an object.

const original = { a: 1, b: 2 };
const clone = Object.assign({}, original);
console.log(clone); // { a: 1, b: 2 }

// 3.Adding Default Properties:
// Add default properties to an object if they don't already exist.
const defaults = { theme: 'light', fontSize: 12 };
const userSettings = { fontSize: 14 };
const finalSettings = Object.assign({}, defaults, userSettings);
console.log(finalSettings); // { theme: 'light', fontSize: 14 }

// 4.Modifying an Object in Place:
// Update an existing object with new properties.
const obj = { a: 1 };
Object.assign(obj, { b: 2 });
console.log(obj); // { a: 1, b: 2 }

// Important Notes:
// Shallow Copy: Object.assign performs a shallow copy, meaning nested objects or arrays are copied by reference, not duplicated.

const objex1 = { a: 1, nested: { b: 2 } };
const objex2 = Object.assign({}, obj1);
objex2.nested.b = 3;
console.log(objex1.nested.b); // 3 (changed because it's a reference)
// Non-Enumerable Properties: Object.assign only copies enumerable and own properties. Properties from the prototype chain are not copied.



// important case you need to understand this 
const student1={
    name:"jk",
    age:30
}

const student2=Object.assign(student1)
student2.name="mahesh"
console.log(student2)
console.log(student1)

// Object.assign() ===> it requires two arguments one is target and source
// if you are not passing target then it will consider whatever you pass it is treated as target and source
// so in this case student1 is treated as object and source
// What’s Happening?
// Object.assign(student1):
// Object.assign is used to copy properties from one or more source objects (student1 in this case) to a target object.
// If no target object is provided (like in your case), Object.assign uses the first argument (student1) as both the target and source.
// So, student2 is essentially a reference to the same object as student1. They are not two separate objects; they point to the same memory location.

// const student2 = Object.assign(student1);
// This is equivalent to:
// const student2= student1;

// Modifying student2:
// When you modify student2, you’re actually modifying the same object that student1 points to.
// This is why both student1 and student2 reflect the change.
// student2.name="mahesh" // This modifies the shared object


// How to Fix This?
// If you want to create a new object that is a copy of student1 (so that modifying student2 doesn’t affect student1), you need to provide an empty object ({}) as the target:

// const student1 = {
//   name: "jk",
//   age: 30
// };

// const student2 = Object.assign({}, student1); // Create a new object and copy student1's properties
// student2.name = "mahesh"; // Modify student2

// console.log(student2); // { name: "mahesh", age: 30 }
// console.log(student1); // { name: "jk", age: 30 } (unchanged)
// Explanation:
// Object.assign({}, student1) creates a new object ({}) and copies the properties of student1 into it.
// Now, student2 is a separate object from student1, so modifying student2 does not affect student1.