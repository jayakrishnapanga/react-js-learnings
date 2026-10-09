// Array.prototype.flat() in JavaScript

// The .flat() method flattens nested arrays into a single array, up to a specified depth.


// array.flat(depth)
// depth → how deep to flatten (default = 1).
// Returns a new array (does not modify the original).


// 1. Basic flattening
let arr = [1, 2, [3, 4]];
console.log(arr.flat()); 
// [1, 2, 3, 4]


// 2. Nested arrays (multi-level)
let arr2 = [1, [2, [3, [4]]]];
console.log(arr2.flat());     
// [1, 2, [3, [4]]]   (only flattens 1 level)

console.log(arr2.flat(2));    
// [1, 2, 3, [4]]     (flattens 2 levels)

console.log(arr2.flat(Infinity)); 
// [1, 2, 3, 4]       (flattens completely)

// 3. Removing empty slots ("holes")
let arr3 = [1, , 2, [3, , 4]];
console.log(arr3.flat()); 
// [1, 2, 3, 4]

// 4. Real-world use: combine multiple arrays
let orders = [["apple", "banana"], ["orange"], ["grapes", "mango"]];
let flatOrders = orders.flat();
console.log(flatOrders);
// ["apple", "banana", "orange", "grapes", "mango"]

// 5. With .map() → .flatMap()

// Instead of:

let arr4 = [1, 2, 3];
console.log(arr4.map(x => [x, x * 2]).flat());
// [[1,2],[2,4],[3,6]] → flat → [1, 2, 2, 4, 3, 6]


// We can directly do:

console.log(arr4.flatMap(x => [x, x * 2]));
// [1, 2, 2, 4, 3, 6]


// 👉 So, .flat() is mainly used to simplify nested arrays and remove holes.

// Do you want me to also explain when to use .flat() vs .reduce() for flattening arrays?