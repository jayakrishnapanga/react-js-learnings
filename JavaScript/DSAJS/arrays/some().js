// .some() → “Does at least one element match?”
// Check if an array has any even number
let arr = [1, 3, 5, 7];
console.log(arr.some(num => num % 2 === 0)); 
// false

let arr2 = [1, 3, 4, 7];
console.log(arr2.some(num => num % 2 === 0)); 
// true (because 4 is even)
