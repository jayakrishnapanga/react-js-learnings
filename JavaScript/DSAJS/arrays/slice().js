let arr=["a", "b", "c", "d", "e"];
console.log(arr.slice(1))
console.log(arr.slice(1, 3))
console.log(arr.slice(2, -1))
console.log(arr.slice(-3, -1))



// Yes, JavaScript's Array.prototype.slice() method does support negative indices, and they have specific behavior:

// ✅ Slice Syntax:
// \
// array.slice(start, end)
// start: Index at which to start extraction.

// end (optional): Index before which to end extraction (not inclusive).

// If start or end is negative, it's treated as array.length + negativeIndex

// Let's break down your code step-by-step:

// let arr = ["a", "b", "c", "d", "e"];
// 1. arr.slice(1)
// Starts from index 1 to the end.

// Result: ["b", "c", "d", "e"]

// 2. arr.slice(1, 3)
// Starts at index 1, ends before index 3.

// Extracts: ["b", "c"]

// 3. arr.slice(2, -1)
// 2 is the start index.

// -1 becomes arr.length - 1 = 4, so end at index 4 (exclusive).

// Extracts: ["c", "d"]

// 4. arr.slice(-3, -1)
// -3 → arr.length - 3 = 2, and -1 → arr.length - 1 = 4

// Extracts from index 2 to 4 (exclusive): ["c", "d"]