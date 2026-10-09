x = 10; // No error; creates a global variable `x`
console.log(x); // 10



// No Implicit Global Variables
// In non-strict mode, if you assign a value to an undeclared variable, JavaScript automatically creates a global variable. Strict mode prevents this behavior to avoid accidental pollution of the global scope.

function myFunc() {
    y = 20; // Implicitly creates a global variable `y`
}

myFunc();
console.log(y); // 20



// . Deleting Variables is Not Allowed
// In strict mode, attempting to delete a variable, function, or function parameter using the delete operator throws a SyntaxError.

// Non-Strict Mode:

var z = 30;
delete z; // Silently fails; no error
console.log(z); // 30


// 5. Duplicate Variable Names are Not Allowed
// In strict mode, declaring two variables with the same name in the same scope using var, let, or const throws a SyntaxError.

// Non-Strict Mode:

var x = 10;
var x = 20; // No error; `x` is reassigned
console.log(x)


// 6. Reserved Words Cannot Be Used as Variable Names
// In strict mode, certain reserved words (e.g., eval, arguments, let, yield, etc.) cannot be used as variable names. This prevents confusion and potential errors.

// Non-Strict Mode:

var eval = 10; // No error
console.log(eval); // 10


// 9. Read-Only Properties Cannot Be Assigned
// In strict mode, attempting to assign a value to a read-only property (e.g., undefined, NaN, or properties of global objects) throws a TypeError.

// Non-Strict Mode:

undefined = 10; // Silently fails; no error
console.log(undefined)