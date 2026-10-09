// var: When you declare a variable using var, 
// it gets hoisted to the top of its scope and is automatically initialized with the value undefined. 
// This is because var declarations are subject to "variable instantiation" 
// in the creation phase of the execution context.

Example1:
console.log(x); // Outputs: undefined
var x = 10;
// let and const: With let and const, the hoisting process is slightly different. 
// The variable is hoisted to the top of its scope, but it is not automatically initialized. 
// This means that you cannot access the variable before it's declared, and trying to do so will result in a ReferenceError.

Example2:
console.log(y); // Error: Cannot access 'y' before initialization
let y = 10;
// This distinction was introduced in ECMAScript 6 (ES6) as part of the 
// effort to provide more predictable behavior for variables. With let and const, 
// the idea was to avoid scenarios where a variable might be used before
//  it's been properly set.

// While this behavior might seem a bit more strict, it helps catch potential
//  issues in your code and encourages better coding practices. 
//  Always declare your variables at the beginning of their respective scopes 
//  to avoid any unexpected behavior or errors