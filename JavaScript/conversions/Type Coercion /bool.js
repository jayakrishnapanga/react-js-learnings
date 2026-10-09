
// Boolean + String: Boolean is coerced to a string, and concatenation occurs.

// Boolean + Number: Boolean is coerced to a number, and numeric addition occurs.

// Boolean - String: Boolean is coerced to a number, and the string is attempted to be coerced to a number (if possible).

// Boolean - Number: Boolean is coerced to a number, and numeric subtraction occurs.

// Other Operators (*, /, %): Boolean is coerced to a number, and the string is attempted to be coerced to a number (if possible).

// bool +string 
console.log(true+"hello")
console.log(false+"hello")
console.log(true+"1")
// bool+number
console.log(true+1)
console.log(false+1)

// 3. Boolean - String
// When a boolean is used with the - operator and a string, the boolean is coerced into a number, and the string is attempted to be coerced into a number as well. If the string cannot be converted to a number, the result is NaN (Not a Number).
// Examples:
console.log(true - "hello"); // NaN
console.log(false - "hello"); // NaN
console.log(true - "5"); // -4
console.log(false - "5"); // -5
// Explanation:
// true is coerced to 1, and false is coerced to 0.
// The string "hello" cannot be converted to a number, so the result is NaN.
// The string "5" is successfully converted to the number 5, and numeric subtraction occurs.

// 4. Boolean - Number
// When a boolean is used with the - operator and a number, the boolean is coerced into a number, and numeric subtraction occurs.
// Examples:
console.log(true - 1); // 0
console.log(false - 1); // -1
// Explanation:
// true is coerced to 1.
// false is coerced to 0.
// The - operator performs numeric subtraction.



// a. Boolean * String
// When a boolean is used with the * operator and a string, the boolean is coerced into a number, and the string is attempted to be coerced into a number as well. If the string cannot be converted to a number, the result is NaN.
// Examples:
console.log(true * "hello"); // NaN
console.log(false * "hello"); // NaN
console.log(true * "5"); // 5
console.log(false * "5"); // 0


// b. Boolean / String
// When a boolean is used with the / operator and a string, the boolean is coerced into a number, and the string is attempted to be coerced into a number as well. If the string cannot be converted to a number, the result is NaN.
// Examples:
console.log(true / "hello"); // NaN
console.log(false / "hello"); // NaN
console.log(true / "5"); // 0.2
console.log(false / "5"); // 0

// c. Boolean % String
// When a boolean is used with the % operator and a string, the boolean is coerced into a number, and the string is attempted to be coerced into a number as well. If the string cannot be converted to a number, the result is NaN.
// Examples:
console.log(true % "hello"); // NaN
console.log(false % "hello"); // NaN
console.log(true % "5"); // 1
console.log(false % "5"); // 0