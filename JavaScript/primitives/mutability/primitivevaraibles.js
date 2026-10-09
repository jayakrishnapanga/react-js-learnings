// Primitives are immutable - operations return new values rather than modifying existing ones

// Variables store the actual primitive values (not references)

// When you assign a primitive to another variable, the value is copied

// Any "modification" creates a new value in memory

// This behavior contrasts with objects (including arrays, functions), which are mutable and passed by reference.

// function checkMemoryBehavior() {
//     let a = "original";
//     let b = a; // b points to the same value
    
//     console.log(a === b); // true
    
//     a = "changed"; // creates new primitive
//     console.log(a); // "changed"
//     console.log(b); // "original" (unchanged)
//     console.log(a === b); // false
// }

// checkMemoryBehavior();