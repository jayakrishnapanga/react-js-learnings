
// Key Takeaways
// + Operator:

// If either operand is a string, it performs string concatenation.

// If both operands are numbers, it performs numeric addition.

// -, *, / Operators:

// These operators always perform numeric operations.

// If operands are strings, they are implicitly coerced into numbers.

// String Concatenation:

// When using + with strings, always be cautious, as it can lead to unexpected results if you intended to perform numeric addition.

// Type Coercion:

// JavaScript implicitly converts types in certain contexts (e.g., strings to numbers for arithmetic operations other than +).


// a. String and Number Coercion

console.log(5 + "5"); // "55" (number 5 is coerced to a string)
console.log("10" - 5); // 5 (string "10" is coerced to a number)
console.log("10" * "2"); // 20 (both strings are coerced to numbers)
console.log("10" / "2"); // 5 (both strings are coerced to numbers)
console.log("5" + "5"); // "55" (string concatenation)