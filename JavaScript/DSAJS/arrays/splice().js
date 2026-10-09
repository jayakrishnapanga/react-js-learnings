// ✅ splice() Overview
// array.splice(start, deleteCount, item1, item2, ...)
// Modifies the original array.

// Returns an array of deleted elements.

// Parameters:
// start: Index at which to start changing the array.

// deleteCount: Number of elements to remove.

// item1, item2, ... (optional): Elements to add at the start index.


// 🔍 Example:
let arr = ["a", "b", "c", "d", "e"];
console.log(arr.splice(2, 2)); // ["c", "d"]
console.log(arr);              // ["a", "b", "e"]
// Explanation:
// At index 2, remove 2 elements → "c" and "d"

// The original array is changed.





// | Feature             | `slice()`    | `splice()`                     |
// | ------------------- | ------------ | ------------------------------ |
// | Mutates array?      | ❌ No         | ✅ Yes                          |
// | Returns             | Shallow copy | Removed elements               |
// | Adds items?         | ❌ No         | ✅ Yes (inserts at start index) |
// | Supports negatives? | ✅ Yes        | ✅ Yes                          |
