// for...in loop

// Iterates over enumerable properties of an object.
// Not recommended for arrays due to performance overhead.

const obj = { a: 1, b: 2, c: 3 };
for (const key in obj) {
    console.log(key, obj[key]);
}