// 2. Impure Functions
// An impure function is a function that:

// Modifies external variables or state (Side effects).
// May return different outputs for the same input.
// Example of an Impure Function (Modifies External State)

let total = 0; // External state

function addToTotal(num) {
    total += num; // Modifies external state
    return total;
}

console.log(addToTotal(5)); // Output: 5
console.log(addToTotal(5)); // Output: 10 (Different output for the same input)
// ❌ Why is this function impure?

// It modifies the total variable, which is outside its scope.
// It does not always return the same output for the same input.
// Another Example: Impure Function (Using Random Values)

function getRandomNumber() {
    return Math.random(); // Generates a different output each time
}

console.log(getRandomNumber()); // Output: Random number (changes every time)
console.log(getRandomNumber()); // Output: Different random number
// ❌ Why is this function impure?

// It returns a different result each time because of Math.random().
