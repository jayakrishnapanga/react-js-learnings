// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz
// Temporal dead zone (TDZ)
// A variable declared with let, const, or class is said to be in a "temporal dead zone" (TDZ) from the start of the block until code execution reaches the place where the variable is declared and initialized.

// The Temporal Dead Zone (TDZ) in JavaScript refers to the period between when a variable is declared with let or const and when it is actually initialized with a value.

// During this period, accessing the variable will result in a ReferenceError, even though memory for the variable has already been allocated.

// When and How is the Temporal Dead Zone Created?
// Memory Allocation Phase:
// During the creation phase of the execution context:
// Memory is allocated for variables declared with let and const.
// However, they are not immediately initialized like var (which gets undefined by default).
// Temporal Dead Zone Duration:
// The variable remains in the TDZ from the start of the block or function scope until the execution reaches the line where the variable is declared and initialized.
// Example 1: TDZ with let

// console.log(a); // ReferenceError: Cannot access 'a' before initialization
// let a = 10;
// console.log(a); // Output: 10
// What happens:
// Memory is allocated for a, but it is not initialized.
// Accessing a before its declaration throws a ReferenceError.
// Example 2: TDZ with const

// console.log(b); // ReferenceError: Cannot access 'b' before initialization
// const b = 5;
// Why it happens:
// const must be initialized at the time of declaration.
// b remains in the TDZ until the declaration line.
// Example 3: No TDZ with var
// console.log(c); // Output: undefined
// var c = 20;
// console.log(c); // Output: 20
// Explanation:
// var is hoisted and initialized to undefined during the creation phase.
// No TDZ exists for var.
// Key Characteristics of the Temporal Dead Zone:
// Scope-Based: The TDZ starts at the beginning of the block and ends when the variable is initialized.
// Error Type: Accessing the variable in the TDZ throws a ReferenceError.
// let and const Only: It applies only to let and const, not var.
// Why TDZ Exists
// TDZ prevents developers from accidentally accessing variables before they are safely initialized. This helps catch potential bugs and encourages better coding practices by making variable handling more predictable and strict.

// Understanding TDZ helps avoid errors when dealing with let and const in block-scoped code.











let a=20
console.log(b)
var b=30
console.log(a)
