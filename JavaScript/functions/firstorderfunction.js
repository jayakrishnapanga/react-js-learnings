// First-Order Functions in JavaScript
// A first-order function is a function that does not take another function as an argument or return a function as a result. It simply processes data and returns a value.

function add(a, b) {
    return a + b;
}

const result = add(5, 3);
console.log(result); // Output: 8


// Here, add is a first-order function because it only takes numbers as input and returns a number.
// It does not accept a function as an argument or return a function.