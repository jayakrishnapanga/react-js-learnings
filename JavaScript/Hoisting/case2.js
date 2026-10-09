// let and const Hoisting
// Variables declared with let and const are hoisted but remain in the Temporal Dead Zone (TDZ) until they are initialized.

console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 5;

console.log(z); // ReferenceError: Cannot access 'z' before initialization
const z = 10;