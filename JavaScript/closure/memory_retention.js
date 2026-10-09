// The returned function remembers variables from the outer function, even after the outer function has executed.
// JavaScript achieves this through closures, keeping the necessary scope alive.


function createBigClosure() {
    let gonu = {
        name:"hello from jk"
    }
    return function () {
        console.log("Still holding onto bigData!");
    };
}


const myFunc = createBigClosure(); // bigData is still in memory!

console.log("data")
console.log("data")
// myFunc=null
myFunc()
console.log("hello ramante chelli1 ")
function add(){
    return 5
}
add()
console.log("hello ramante chelli2 ")
console.log("hello ramante chelli3 ")
// Alternative: Using WeakMap or WeakRef to Prevent Memory Leaks
// If you don’t want closures to hold onto large objects forever, use a WeakMap:

// myFunc = null; // Now, bigData can be garbage collected
// Because WeakMap does not prevent garbage collection, bigData will be removed automatically when no references exist.