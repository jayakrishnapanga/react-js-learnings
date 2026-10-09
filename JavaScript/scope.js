
// it is very example to unsesatnd scope, scope chain ,and lexical environment 
function a(){
    var b=33
    c();
    function c(){
        console.log(b)
    }
}

a()


// What is a Lexical Environment?
// In JavaScript, a Lexical Environment is a specification type that holds identifier-variable mapping. It includes the mechanism for resolving identifiers (variable and function names) to their corresponding values within a given scope. A Lexical Environment consists of:

// Environment Record:
// The environment record stores the variable and function declarations found within the current scope.
// There are two types of environment records: declarative (which stores functions, let, const, and class declarations) and object environment records (which store bindings created by var declarations).
// A Reference to the Outer Environment:
// This reference points to the Lexical Environment that logically surrounds the current environment. It is how JavaScript achieves lexical (static) scoping.
// For example, if a function is nested within another function, the outer environment of the inner function's Lexical Environment is the Lexical Environment of the outer function.
// When is a Lexical Environment Created?
// A Lexical Environment is created whenever the execution context is established. This happens in several scenarios:

// Global Environment:
// The global environment is created when the script starts running. It is the outermost environment, where global variables and functions are stored.
// Its outer environment reference is null because it does not have an environment surrounding it.
// Function Environment:
// Each time a function is invoked, a new Lexical Environment is created for that function call. This environment includes bindings for its local variables, the arguments passed to the function, and other function-related information.
// The outer environment of a function's Lexical Environment is the environment in which the function was declared (not where it was called from). This facilitates closure behavior where a function has access to variables from its defining scope even if it's executed outside that scope.
// Block Environment:
// In ES6 and later, blocks ({...}) such as those used in if statements or loops with let or const declarations also create new Lexical Environments. These environments help in handling block-scoped variables.
// The outer environment in this case is the closest surrounding Lexical Environment (e.g., the function or global environment in which the block is located).
// Example to Illustrate Lexical Environment
// Consider the following JavaScript code:

// javascript
// Copy code
// var x = 10;
// function outer() {
//     let y = 20;
//     function inner() {
//         const z = 30;
//         console.log(x, y, z); // Accesses x, y, and z
//     }
//     return inner;
// }
// const myInner = outer();
// myInner(); // Logs: 10 20 30
// Lexical Environments:

// Global Lexical Environment:
// Contains x and outer.
// Outer environment reference is null.
// Lexical Environment for outer:
// Contains y and inner.
// Outer environment reference points to the Global Lexical Environment.
// Lexical Environment for inner:
// Contains z.
// Outer environment reference points to the Lexical Environment of outer.
// When myInner() is called, even though outer() has already executed, inner() still has access to y from outer() and x from the global scope. 
// This is made possible by the chain of Lexical Environments and their outer environment references, illustrating how closures work.

// Summary
// The concept of Lexical Environments is fundamental for understanding how scoping and closures work in JavaScript. 
// It explains how data privacy and state can be maintained in functional programming with JavaScript. Each environment is a frame
//  in the call stack for function calls, but Lexical Environments provide the structural basis for managing scope beyond just the stack mechanics.


