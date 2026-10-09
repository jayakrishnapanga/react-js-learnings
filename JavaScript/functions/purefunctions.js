// 1. Pure Functions
// A pure function is a function that:

// Always returns the same output for the same input (Deterministic).
// Has no side effects (Does not modify external state, variables, or data).
// Example of a Pure Function

function add(a, b) {
    return a + b;
}

console.log(add(5, 3)); // Output: 8
console.log(add(5, 3)); // Output: 8 (Always the same output for the same input)
// ✅ Why is this function pure?

// It depends only on its parameters (a and b).
// It does not modify any external state.
// It always produces the same output for the same input.
// Another Example: Pure Function with Arrays

function doubleNumbers(arr) {
    return arr.map(num => num * 2);
}

console.log(doubleNumbers([1, 2, 3])); // Output: [2, 4, 6]
console.log(doubleNumbers([1, 2, 3])); // Output: [2, 4, 6] (Same output for same input)


// Why Use Pure Functions?
// ✔ Predictability – Always produces the same output.
// ✔ Testability – Easier to test since output depends only on input.
// ✔ No Side Effects – Does not modify external state.
// ✔ Reusability – Can be used in multiple places without unintended consequences


// Conclusion
// Use pure functions whenever possible to write clean, maintainable, and bug-free code.
// Impure functions are sometimes necessary (e.g., interacting with databases, APIs, logging).
