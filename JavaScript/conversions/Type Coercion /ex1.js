// Type coercion is the automatic or implicit conversion of values from one data type to another. 
// JavaScript is known for its flexible and sometimes surprising type coercion rules, especially when using operators like +, -, ==, etc.


// a. String and Number Coercion

console.log(5 + "5"); // "55" (number 5 is coerced to a string)
console.log("10" - 5); // 5 (string "10" is coerced to a number)
console.log("10" * "2"); // 20 (both strings are coerced to numbers)
console.log("10" / "2"); // 5 (both strings are coerced to numbers)
console.log("5" + "5"); // "55" (string concatenation)
// b. Boolean Coercion
// JavaScript coerces values to booleans in logical contexts (e.g., if statements, logical operators).

console.log(Boolean(0)); // false
console.log(Boolean("")); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean("hello")); // true
console.log(Boolean(42)); // true


// c. Loose Equality (==) vs Strict Equality (===)
// == performs type coercion before comparing values.

// === does not perform type coercion (strict equality).

console.log(5 == "5"); // true (coercion happens)
console.log(5 === "5"); // false (no coercion, different types)
console.log(0 == false); // true (coercion happens)
console.log(0 === false); // false (no coercion, different types)


console.log(+"5"); // 5 (unary plus coerces string to number)
console.log(+true); // 1 (true is coerced to 1)
console.log(+false); // 0 (false is coerced to 0)
console.log(+null); // 0 (null is coerced to 0)
console.log(+undefined); // NaN (undefined cannot be coerced to a number)
console.log(+"hello"); // NaN (string cannot be coerced to a number)
console.log(+""); // 0 (empty string coerced to 0)
console.log(+[]); // 0 (empty array coerced to 0)
console.log(+[1]); // 1 (array with one element coerced to number)
console.log(+{}); // NaN (object cannot be coerced to a number)
console.log(+{ valueOf: () => 42 }); // 42 (valueOf method is called)
console.log(+{ toString: () => "42" }); // 42 (toString method is called)       
// In the above example, the unary plus operator (+) is used to coerce values to numbers.
// When applied to different types, the unary plus operator behaves as follows:
// Strings: Coerced to numbers if they contain valid numeric values.
// Booleans: true is coerced to 1, and false is coerced to 0.
// null: Coerced to 0.
// undefined: Coerced to NaN.
// Empty strings: Coerced to 0.
// Arrays: Coerced to numbers based on their content.
// Objects: Coerced to numbers using the valueOf and toString methods.
// The unary plus operator is a common way to convert strings to numbers in JavaScript.
// It is important to note that the unary plus operator does not perform any rounding or formatting of numbers. It simply coerces the value to a number.


// d. Other Coercion Examples
// Other examples of type coercion in JavaScript include:  
// Coercing Strings to Numbers
// Coercing Booleans to Numbers
// Coercing Objects to Numbers
// Coercing Objects to Booleans
// Coercing Objects to Strings
// Coercing Arrays to Strings
// Coercing Strings to Arrays
// Coercing Booleans to Strings
// Coercing Booleans to Objects
// Coercing Numbers to Strings
// Coercing Numbers to Objects
// Coercing Numbers to Booleans
// Coercing Functions to Strings
// Coercing Functions to Numbers
// Coercing Functions to Booleans
// Coercing Functions to Objects
// Coercing Functions to Arrays
// Coercing Functions to Symbols    
// Type coercion is an essential aspect of JavaScript's flexibility, but it can lead to unexpected behavior if not understood properly.
// It is important to be aware of how values are coerced in different contexts to avoid common pitfalls and bugs in JavaScript code.
// By understanding the rules of type coercion, you can write more predictable and robust JavaScript code.
