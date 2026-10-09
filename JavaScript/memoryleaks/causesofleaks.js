// Memory leaks in JavaScript happen when unused memory is not freed due to lingering references.
//  The most common causes are:
// Unused global variables
// Unclosed setInterval or setTimeout
// Detached DOM elements with event listeners
// Closures holding references
// Long-lived event listeners


//  Best Practices to Prevent Memory Leaks
// ✔ Always declare variables with let or const (avoid accidental globals).
// ✔ Clear setInterval and setTimeout when done.
// ✔ Remove event listeners when elements are deleted.
// ✔ Avoid unnecessary object references in closures.
// ✔ Use WeakMap for dynamic object storage to allow GC.
// ✔ Monitor memory usage with DevTools regularly.

