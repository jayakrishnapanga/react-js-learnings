
// 7. Variable and Function with Same Name:

// case-1
var a = 10;
function x() {
  console.log("Function");
}

console.log(a); // Output: 10


// case-2
var b= 10;
function y() {
  console.log("Function");
}

console.log(b); // Output: 10

// Here, the variable x is hoisted, and the function declaration function x() is also hoisted.
//  However, since variable declarations take precedence over function declarations, x will be the value 10.