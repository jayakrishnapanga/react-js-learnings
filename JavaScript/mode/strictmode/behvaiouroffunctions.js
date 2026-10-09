// Block-Scoped Functions:
// In strict mode, function declarations inside blocks (e.g., inside if or for statements) are block-scoped and not hoisted to the top of the enclosing function or global scope.


"use strict";

if (true) {
    console.log(myFunc()); // Works: "Hello"
    function myFunc() {
        return "Hello";
    }
}

console.log(myFunc()); // ReferenceError: myFunc is not defined


//  No Duplicate Parameter Names
// In strict mode, functions cannot have duplicate parameter names. This prevents confusion and potential bugs.

// Example:

function my(a, a) { // SyntaxError: Duplicate parameter name not allowed
    return a + a;
}


// this Behavior
// In strict mode, the value of this inside a function is not automatically coerced to the global object (window in browsers) when the function is called without a context. Instead, this is undefined.

function behaviorOfThis() {
    console.log(this); // undefined (in non-strict mode, this would be the global object)
}


// . Restrictions on arguments Object
// In strict mode, the arguments object behaves differently:

// arguments is not aliased to the function's parameters. Modifying a parameter does not modify the corresponding value in arguments, and vice versa.

// The arguments.callee and arguments.caller properties are disabled and throw a TypeError if accessed.

// Example:


function myFunc(a, b) {
    a = 10;
    console.log(arguments[0]); // 1 (in non-strict mode, this would be 10)
}

myFunc(1, 2);




// In strict mode, assigning a value to an undeclared variable throws a ReferenceError. 
// This prevents accidental creation of global variables.

// Example:

function myFunc() {
    x = 10; // ReferenceError: x is not defined
}

myFunc();



// No Deleting Variables, Functions, or Function Parameters
// In strict mode, attempting to delete a variable, function, or function parameter throws a SyntaxError.

// function myFunc(a) {
//     delete a; // SyntaxError: Delete of an unqualified identifier in strict mode
// }

// myFunc(10);


// Reserved Words
// In strict mode, certain reserved words (e.g., eval, arguments, let, yield, etc.) cannot be used as variable or function names.
// Example:

// function eval() { // SyntaxError: Unexpected eval or arguments in strict mode
//     console.log("Hello");
// }