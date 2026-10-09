const student1={
    name:"krishna",
    details:{
        age:25,
        address:{
            city:"hyd"
        }
    }
}

const student2={...student1};

student2.name="sai";

console.log(student1)
console.log(student2)

student2.details.age=30;
console.log("student1",student1)
console.log("student2",student2)



// 1. Shallow Copy
// A shallow copy creates a new object or array, but it only copies the top-level properties or elements. If the object or array contains nested objects or arrays, those nested structures are shared between the original and the copy. 
// This means:
// Changes to nested objects or arrays in the copy will affect the original, and vice versa.
// Only the first level is duplicated; deeper levels are referenced.

// Ways to Create a Shallow Copy in JavaScript:
// Using the Spread Operator (...):

const original = { a: 1, b: { c: 2 } };
const shallowCopy = { ...original };

shallowCopy.b.c = 99; // Modifies the nested object in both original and shallowCopy
console.log(original); // { a: 1, b: { c: 99 } }
console.log(shallowCopy); // { a: 1, b: { c: 99 } }


// Using Object.assign():

const original1 = { a: 1, b: { c: 2 } };
const shallowCopy1 = Object.assign({}, original1);

shallowCopy1.b.c = 99; // Modifies the nested object in both original and shallowCopy
console.log(original1); // { a: 1, b: { c: 99 } }
console.log(shallowCopy1); // { a: 1, b: { c: 99 } }


// Using Array.prototype.slice() (for arrays):

const original2 = [1, 2, [3, 4]];
const shallowCopy2 = original2.slice();

shallowCopy2[2][0] = 99; // Modifies the nested array in both original and shallowCopy
console.log(original2); // [1, 2, [99, 4]]
console.log(shallowCopy2); // [1, 2, [99, 4]]