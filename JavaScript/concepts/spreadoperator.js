// In JavaScript, the spread operator (...) and the rest operator (...) look the same but serve different purposes. Let’s break them down:

// 1. Spread Operator (...)
// The spread operator is used to "spread" or expand elements of an iterable (like an array or object) into individual elements. It is commonly used for:
// Copying arrays or objects.
// Merging arrays or objects.
// Passing elements of an array as arguments to a function.
// Examples of Spread Operator:
// Copying an Array:

const arr1 = [1, 2, 3];
const arr2 = [...arr1]; // Creates a shallow copy of arr1

console.log(arr2); // [1, 2, 3]
// Merging Arrays:
// const arr1 = [1, 2];
// const arr2 = [3, 4];
// const merged = [...arr1, ...arr2]; // Merges arr1 and arr2
// console.log(merged); // [1, 2, 3, 4]

// Copying an Object:

// const obj1 = { a: 1, b: 2 };
// const obj2 = { ...obj1 }; // Creates a shallow copy of obj1
// console.log(obj2); // { a: 1, b: 2 }


// Merging Objects:

// const obj1 = { a: 1, b: 2 };
// const obj2 = { c: 3, d: 4 };
// const merged = { ...obj1, ...obj2 }; // Merges obj1 and obj2
// console.log(merged); // { a: 1, b: 2, c: 3, d: 4 }


// Passing Array Elements as Function Arguments:

const numbers = [1, 2, 3];
function sum(a, b, c) {
  return a + b + c;
}
console.log(sum(...numbers)); // 6 (spreads array elements as arguments)