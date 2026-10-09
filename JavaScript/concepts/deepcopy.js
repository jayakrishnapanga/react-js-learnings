// What is Deep Copy?
// A deep copy is a way of copying an object where all nested objects or arrays are also duplicated, rather than just referencing the original memory location.
// This means that changes to the copied object do not affect the original object.
// In JavaScript, you can create a deep copy of an object using JSON.parse(JSON.stringify(obj)).
// This method is not perfect, as it does not work with functions, undefined, or circular references.
// To create a deep copy that works with these cases, you would need to write a custom deep copy function.
// Example
const student1={
    name:"krishna",
    details:{
        age:25,
        address:{
            city:"hyd"
        }
    }
}

const student2=JSON.parse(JSON.stringify(student1));

student2.name="sai";
student2.details.age=30;
console.log("student1",student1)
console.log("student2",student2)

// Why JSON.parse(JSON.stringify(obj)) Works for Deep Copy?
// This method converts an object to a JSON string (JSON.stringify()) and then back to an object (JSON.parse()). Since JSON only supports basic data types (string, number, boolean, array, object, null), it removes anything that is not JSON-compatible (like functions, undefined, Symbol, and circular references).

// What This Means?
// ✅ Works Well For:

// Primitive values (number, string, boolean, null)
// Objects and arrays (including nested structures)
// 🚫 Does NOT Work For:

// Functions: Functions are not part of JSON, so they get removed.
// undefined Values: JSON ignores undefined, so missing values disappear.
// Special Objects (Date, RegExp, Map, Set, etc.): They are converted to strings or lost.
// Circular References: If an object refers to itself, JSON.stringify() will throw an error.
// Examples of What Gets Lost
// 1️⃣ Functions Are Removed

const obj = { 
    name: "Alice", 
    greet: function() { return "Hello"; } 
};

const deepCopy = JSON.parse(JSON.stringify(obj));
console.log(deepCopy.greet); // Output: undefined (function is removed)


// Since JSON does not support functions, they are removed from the copied object.


// 2️⃣ undefined Values Are Lost

const obj1 = { name: "Alice", age: undefined };

const deepCopy1 = JSON.parse(JSON.stringify(obj1));
console.log(deepCopy1); // Output: { name: "Alice" }  (age is removed)
// undefined is ignorexd because JSON does not support it.



// Special Objects Convert Incorrectly
// Date and RegExp objects are converted into strings, not real objects.
const obj2 = { 
    date: new Date(), 
    regex: /hello/i 
};

const deepCopy2 = JSON.parse(JSON.stringify(obj2));
console.log(deepCopy2); 
// Output: { date: "2024-03-02T12:00:00.000Z", regex: {} }
// Date gets converted into a string (not a real Date object).
// RegExp becomes an empty object.



// Circular References Cause Errors

const obj3 = { name: "Alice" };
obj3.self = obj3; // Circular reference

const deepCopy3 = JSON.parse(JSON.stringify(obj3)); 
// ❌ ERROR: "Converting circular structure to JSON"
// Since JSON cannot handle circular references (where an object refers to itself), it throws an error.

const obj4 = { name: "Alice", age: 25 };
const deepCopy4 = structuredClone(obj4);

// ✔ JSON.parse(JSON.stringify(obj)) is a simple deep copy method but removes functions, undefined values, and special objects.
// ✔ If you need a better deep copy, use structuredClone(), Lodash, or a recursive function.

// Using a Custom Recursive Function:
// You can write your own function to deep copy objects and arrays:
function deepCopy(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return obj; // Return primitives and null as-is
    }
    const copy = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      copy[key] = deepCopy(obj[key]);
    }
    return copy;
  }
  
  const original = { a: 1, b: { c: 2 } };
  const deepCopy = deepCopy(original);
  
  deepCopy.b.c = 99; // Modifies only the deepCopy
  console.log(original); // { a: 1, b: { c: 2 } }
  console.log(deepCopy); // { a: 1, b: { c: 99 } }


// Using a Library like Lodash (_.cloneDeep):
// Lodash provides a reliable way to deep copy objects and arrays, even with complex data types.

const _ = require('lodash');
const original1 = { a: 1, b: { c: 2 } };
const deepCopyex = _.cloneDeep(original);

deepCopyex.b.c = 99; // Modifies only the deepCopy
console.log(original1); // { a: 1, b: { c: 2 } }
console.log(deepCopyex);