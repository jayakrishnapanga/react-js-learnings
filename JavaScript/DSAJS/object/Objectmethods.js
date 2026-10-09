// 1. Object.keys()
// Gets an array of the object's own property keys.

const user = { name: "Alice", age: 25 };
console.log(Object.keys(user)); // ["name", "age"]

// 2. Object.values()
// Gets an array of the object's own property values.
console.log(Object.values(user)); // ["Alice", 25]

// 3. Object.entries()
// Gets an array of key-value pairs.
console.log(Object.entries(user)); 
// [["name", "Alice"], ["age", 25]]

// 4. Object.fromEntries()
// Converts an array of key-value pairs back into an object.
const entries = [["name", "Alice"], ["age", 25]];
console.log(Object.fromEntries(entries)); 
// { name: "Alice", age: 25 }

// 5. Object.hasOwn() (or Object.hasOwnProperty())
// Checks if an object has a property (own property, not from prototype).
console.log(Object.hasOwn(user, "name")); // true
console.log(user.hasOwnProperty("age"));  // true (older way)

// 6. Object.freeze()
// Prevents modifications (adding, deleting, or changing properties).
const obj = { name: "Alice" };
Object.freeze(obj);
obj.name = "Bob"; // No effect
console.log(obj.name); // "Alice"

// 7. Object.seal()
// Prevents adding or deleting properties but allows modifications.
const obj2 = { name: "Alice" };
Object.seal(obj2);
obj2.name = "Bob";  // Allowed
delete obj2.name;   // Not allowed
console.log(obj2);  // { name: "Bob" }

// 8. Object.getOwnPropertyDescriptors()
// Gets metadata about properties (writable, configurable, enumerable, etc.).
const desc = Object.getOwnPropertyDescriptors(user);
console.log(desc.name); 
// { value: "Alice", writable: true, enumerable: true, configurable: true }

// 9. Object.defineProperty()
// Defines or modifies a property with specific descriptors.
const obj3 = {};
Object.defineProperty(obj3, "name", { 
  value: "Alice", 
  writable: false 
});
obj3.name = "Bob";  // No effect
console.log(obj3.name); // "Alice"