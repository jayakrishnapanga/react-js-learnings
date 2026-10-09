


// 1. Variable Declaration Hoisting:

console.log(x); // Output: undefined
var x = 10;





// In this example, the declaration var x; is hoisted to the top of its scope. 
// However, the initialization x = 10; remains in its original position. 
// So, when you try to console.log(x), x exists but has not yet been assigned a value,
//  so it outputs undefined.\


// 2. Function Declaration Hoisting:


myFunction(); // Output: "Hello!"

function myFunction() {
  console.log("Hello!");
}


// In this case, the entire function declaration is hoisted to the top. 
// This allows you to call myFunction() before it has been declared in the code.


// 3. Function Expression Hoisting:

myFunction(); // Error: myFunction is not a function

var myFunction = function() {
  console.log("Hello!");
};
// In this example, the variable myFunction is hoisted, but its value is undefined at the time of the call. 
// This is because only the variable declaration is hoisted, not the assignment. So, when you try to call myFunction(), it results in an error.




// 4. Hoisting in Blocks (ES6 with let and const):

console.log(x); // Error: Cannot access 'x' before initialization
let x = 10;
// With let and const, variables are hoisted but are not initialized.
//  Accessing them before the initialization results in a ReferenceError.


// 5. Hoisting Function Expressions:

myFunction(); // Error: myFunction is not a function

let myFunction = function() {
  console.log("Hello!");
};
// Even though let hoists, the variable is not initialized before the let statement, 
// so trying to call myFunction() before the initialization results in an error