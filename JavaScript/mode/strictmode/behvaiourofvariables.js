"use strict";

x = 10; // ReferenceError: x is not defined
console.log(x);


// In non-strict mode, if you assign a value to an undeclared variable, JavaScript automatically creates a global variable.
// Strict mode prevents this behavior to avoid accidental pollution of the global scope.
function myFunc() {
    y = 20; // ReferenceError: y is not defined
}

myFunc();
console.log(y);


// . Deleting Variables is Not Allowed
// In strict mode, attempting to delete a variable, function, or function parameter using the delete operator throws a SyntaxError.

// var z = 30;
// delete z; // Silently fails; no error
// console.log(z); // 30

// 5. Duplicate Variable Names are Not Allowed
// In strict mode, declaring two variables with the same name in the same scope using var, let, or const throws a SyntaxError.

// Strict Mode:
var x = 10;
var x = 20; // SyntaxError: Identifier 'x' has already been declared
console.log(x);


// 6. Reserved Words Cannot Be Used as Variable Names
// In strict mode, certain reserved words (e.g., eval, arguments, let, yield, etc.) cannot be used as variable names. This prevents confusion and potential errors.
// Strict Mode:

// var eval = 10; // SyntaxError: Unexpected eval or arguments in strict mode
// console.log(eval);


// 9. Read-Only Properties Cannot Be Assigned
// In strict mode, attempting to assign a value to a read-only property (e.g., undefined, NaN, or properties of global objects) throws a TypeError.

// Strict Mode:
// undefined = 10; // TypeError: Cannot assign to read-only property 'undefined'
// console.log(undefined);