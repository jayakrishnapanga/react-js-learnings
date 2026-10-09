
// .every() → “Do all elements match?”

// 1. Check if all numbers are positive
let arr = [1, 2, 3, 4, 5];
console.log(arr.every(num => num > 0)); 
// true

let arr2 = [1, -2, 3, 4];
console.log(arr2.every(num => num > 0)); 
// false (because -2 is not > 0)