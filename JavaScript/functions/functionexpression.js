// Function Expression in JavaScript
// A function expression is a way to define a function in JavaScript by assigning it to a variable.
//  Unlike function statements, function expressions are not hoisted, meaning they cannot be used before they are defined.
functionName()
const functionName = function(parameters) {
    // Function body
    return result;
};


console.log(multiply(2, 3)); // ❌ Error: Cannot access 'multiply' before initialization

const multiply = function(a, b) {
    return a * b;
};


// Can Be Named or Anonymous:

// A named function expression has a name for better debugging and recursion.
// An anonymous function expression does not have a name.
// Named Function Expression:


const factorial = function fact(n) {
    return n === 0 ? 1 : n * fact(n - 1);
};

console.log(factorial(5)); // Output: 120


// A function expression defines a function inside a variable.
// It is not hoisted, so it must be defined before use.
// It is useful for callbacks, closures, and functional programming.