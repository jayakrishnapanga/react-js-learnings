
// in non-strict mode, function declarations inside blocks are hoisted to the enclosing function or global scope. This can cause unexpected behavior and bugs.
if (true) {
    console.log(myFunc()); // Works: "Hello"
    function myFunc() {
        return "Hello";
    }
}

console.log(myFunc());


// in non-strict duplicate parameter names are allowed
function my(a, a) { 
    return a + a;
}

console.log(my(2, 3)); // ReferenceError: myFunc is not defined




function behaviorOfThis() {
    console.log(this); // undefined (in non-strict mode, this would be the global object)
}

