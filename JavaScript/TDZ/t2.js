// Temporal dead zone (TDZ)
// A variable declared with let, const, or class is said to be in a "temporal dead zone" (TDZ) from the start of the block until code execution reaches the place where the variable is declared and initialized.

// While inside the TDZ, the variable has not been initialized with a value, and any attempt to access it will result in a ReferenceError. The variable is initialized with a value when execution reaches the place in the code where it was declared. If no initial value was specified with the variable declaration, it will be initialized with a value of undefined

// This differs from var variables, which will return a value of undefined if they are accessed before they are declared. 
// The code below demonstrates the different result when let and var are accessed in code before the place where they are declared.


{
    // TDZ starts at beginning of scope
    console.log(bar); // "undefined"
    console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
    var bar = 1;
    let foo = 2; // End of TDZ (for foo)
}

  