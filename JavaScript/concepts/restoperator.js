// 2. Rest Operator (...)
// The rest operator is used to collect multiple elements or properties into a single array or object. It is commonly used in:

// Function parameters to handle an indefinite number of arguments.

// Destructuring assignments to capture remaining elements.

// Examples of Rest Operator:

// Collecting Function Arguments:

function sum(...args) {
    console.log(args); // Output: [1, 2, 3] (args is
  return args.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 6 (args = [1, 2, 3])
console.log(sum(1, 2, 3, 4, 5)); // 15 (args = [1, 2, 3, 4, 5])

// Destructuring Arrays:

const [first, second, ...restarr] = [1, 2, 3, 4, 5];

console.log(first); // 1
console.log(second); // 2
console.log(restarr); // [3, 4, 5] (collects the remaining elements)

// Destructuring Objects:

const obj = { a: 1, b: 2, c: 3, d: 4 };
const { a, b, ...restobj } = obj;

console.log(a); // 1
console.log(b); // 2
console.log(restobj); // { c: 3, d: 4 } (collects the remaining properties)