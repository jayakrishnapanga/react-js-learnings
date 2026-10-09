
let a=30
a=50


// Here's what happens in memory:

// First Assignment (let a = 30):

// JavaScript allocates memory for the number primitive 30

// The variable a is created and points to this memory location containing 30

// Reassignment (a = 50):

// JavaScript allocates new memory for the number primitive 50

// The variable a is updated to point to this new memory location

// The original 30 value still exists in memory but is now unreachable (and will eventually be garbage collected)

// Key Points:
// Primitive Immutability: The number 30 itself isn't changed - a completely new primitive value 50 is created.

// Variable Binding: The variable a is just a reference that gets updated to point to the new value.

// Memory Behavior:

// Before reassignment: a → 30 (in memory)

// After reassignment: a → 50 (new memory), 30 becomes orphaned

// Visualization:
// Before:
// Memory: [..., 30, ...]
// Variables: a → 30

// After a = 50:
// Memory: [..., 30, 50, ...]
// Variables: a → 50
// This demonstrates that with primitives, we're not modifying values - we're creating new ones and changing what the variable points to.



