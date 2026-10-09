// 2. Type Conversion in JavaScript
// Type conversion, also known as type casting, is the explicit conversion of a value from one data type to another. JavaScript provides built-in functions and methods for explicit type conversion.

// Key Characteristics of Type Conversion in JavaScript:
// Explicit: The programmer explicitly specifies the conversion.

// Predictable: The behavior is clear and intentional.

// Avoids Surprises: Reduces the risk of unexpected behavior.

// Examples of Type Conversion:
// a. Converting to a Number
// Use Number(), parseInt(), or parseFloat() to convert values to numbers.
console.log(Number("42")); // 42
console.log(Number("3.14")); // 3.14
console.log(Number("hello")); // NaN (Not a Number)
console.log(parseInt("42px")); // 42 (parses until non-numeric character)
console.log(parseFloat("3.14.15")); // 3.14 (parses until invalid float)


// b. Converting to a String
// Use String() or the .toString() method to convert values to strings.

console.log(String(42)); // "42"
console.log(String(true)); // "true"
console.log((42).toString()); // "42"
console.log((true).toString()); // "true"


// c. Converting to a Boolean
// Use Boolean() to explicitly convert values to booleans.

console.log(Boolean(0)); // false
console.log(Boolean("")); // false
console.log(Boolean("hello")); // true
console.log(Boolean(42)); // true


// d. Other Conversions
// Arrays to Strings: Use .join() or String().

console.log(String([1, 2, 3])); // "1,2,3"
console.log([1, 2, 3].join("-")); // "1-2-3"

// Strings to Arrays: Use .split().
 console.log("hello".split("")); // ["h", "e", "l", "l", "o"]

// Strings to Numbers: Use Number(), parseInt(), or parseFloat.

console.log(Number("42")); // 42
console.log(parseInt("42px")); // 42
console.log(parseFloat("3.14")); // 3.14

// Booleans to Numbers: true is 1, and false is 0.

console.log(Number(true)); // 1
console.log(Number(false)); // 0

// Booleans to Strings: "true" or "false".
console.log(String(true)); // "true"
console.log(String(false)); // "false"

// Objects to Numbers: Use valueOf() or toString().

console.log(Number({ a: 1, b: 2 })); // NaN
console.log(Number({ a: 1, b: 2 }.valueOf())); // NaN
console.log(Number({ a: 1, b: 2 }.toString())); // NaN

// Objects to Booleans: true for non-empty objects, false for empty objects.

console.log(Boolean({ a: 1, b: 2 })); // true
console.log(Boolean({})); // false
console.log(Boolean([])); // true
console.log(Boolean([1, 2, 3])); // true

// Objects to Numbers: Use valueOf() or toString().

console.log(Number({ a: 1, b: 2 })); // NaN             
console.log(Number({ a: 1, b: 2 }.valueOf())); // NaN
console.log(Number({ a: 1, b: 2 }.toString())); // NaN

// Objects to Strings: Use JSON.stringify() or String().

console.log(String({ a: 1, b: 2 })); // "[object Object]"
console.log(JSON.stringify({ a: 1, b: 2 })); // "{"a":1,"b":2}"