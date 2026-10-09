// Block Scope (or Lack Thereof):

// In non-strict mode, function declarations are function-scoped, meaning they are accessible throughout the function in which they are declared.

// In strict mode, function declarations are block-scoped (introduced in ES6).


if (true) {
  function sayHi() {
    console.log("Hi!");
  }
}
sayHi();// Works in non-strict mode, but throws an error in strict mode