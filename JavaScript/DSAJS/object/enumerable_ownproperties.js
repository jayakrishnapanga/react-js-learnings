// In JavaScript, objects have properties, and these properties can be classified based on two key characteristics: enumerability and ownership. Let’s break down what these terms mean:

// 1. Own Properties
// Definition: An "own property" is a property that exists directly on the object itself, not on its prototype chain.

// Example:

const obj = { a: 1 };
console.log(obj.hasOwnProperty('a')); // true
console.log(obj.hasOwnProperty('toString')); // false
// Here, a is an own property of obj.

// toString is not an own property; it comes from the object's prototype (Object.prototype).

// Why it matters: Methods like Object.assign or Object.keys only work with own properties by default, ignoring properties inherited from the prototype chain.

// 2. Enumerable Properties
// Definition: An "enumerable property" is a property that can be iterated over in a loop (e.g., for...in loop) or included when using methods like Object.keys.

// Example:


// const obj = { a: 1 };
// Object.defineProperty(obj, 'b', {
//   value: 2,
//   enumerable: false, // Makes 'b' non-enumerable
// });

// console.log(Object.keys(obj)); // ['a']
// console.log(obj.b); // 2 (still accessible, but not enumerable)
// Here, a is enumerable, so it appears in Object.keys(obj).

// b is non-enumerable, so it doesn’t appear in Object.keys(obj) but is still accessible directly.

// Why it matters: Methods like Object.assign only copy enumerable properties. Non-enumerable properties are ignored.

// Combining Both: Enumerable and Own Properties
// When we say Object.assign copies enumerable and own properties, it means:

// It only copies properties that belong directly to the source object (not inherited from the prototype chain).

// It only copies properties that are enumerable (not hidden from iteration).

// Example to Demonstrate Both Concepts

// const parent = { inheritedProp: 'I am inherited' };
// const obj = Object.create(parent); // obj inherits from parent

// obj.ownProp = 'I am an own property';
// Object.defineProperty(obj, 'nonEnumerableProp', {
//   value: 'I am non-enumerable',
//   enumerable: false,
// });

// const copy = Object.assign({}, obj);

// console.log(copy);
// Output: { ownProp: 'I am an own property' }
// Explanation:

// inheritedProp is not copied because it’s not an own property of obj.

// nonEnumerableProp is not copied because it’s non-enumerable.

// Only ownProp is copied because it’s both an own property and enumerable.

