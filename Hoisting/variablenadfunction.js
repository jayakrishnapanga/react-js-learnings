
// 7. Variable and Function with Same Name:

var x = 10;
function x() {
  console.log("Function");
}

console.log(x); // Output: 10

// Here, the variable x is hoisted, and the function declaration function x() is also hoisted.
//  However, since variable declarations take precedence over function declarations, x will be the value 10.