// fun1: Using Closures (Correct Memoization)
function memoizedSquarewithclosure() {
  let cache = {}; // Cache object created in the outer function

  return function (num) { // Inner function (closure)
    if (num in cache) {
      console.log("Present in cache, returning from cache");
      return cache[num];
    } else {
      console.log("Calculating...");
      cache[num] = num * num; // Calculate and store in cache
      return cache[num];
    }
  };
}

const square = memoizedSquarewithclosure(); // Create the memoized function

console.log(square(5)); // Output: Calculating... 25
console.log(square(5)); // Output: Present in cache, returning from cache 25
// How It Works:
// Outer Function (memoizedSquare):
// Creates a cache object.
// Returns the inner function (the closure).
// Inner Function:
// The inner function has access to the cache object because of the closure.
// When you call square(5):
// It checks if 5 is in the cache.
// If yes, it returns the cached result.
// If no, it calculates the result, stores it in the cache, and returns it.

// State Persistence:
// The cache object persists between function calls because it’s part of the closure.
// This means the cache is not recreated every time you call square().




// fun2: Without Closures (Incorrect Memoization)
function memoizedSquarewithoutclosure(num) {
  let cache = {}; // Cache object created every time the function is called

  if (num in cache) {
    console.log("Present in cache, returning from cache");
    return cache[num];
  } else {
    console.log("Calculating...");
    cache[num] = num * num; // Calculate and store in cache
    return cache[num];
  }
}

console.log(memoizedSquarewithoutclosure(5)); // Output: Calculating... 25
console.log(memoizedSquarewithoutclosure(5)); // Output: Calculating... 25 (cache is recreated)
// How It Works:
// No Closure:
// The cache object is created every time the function is called.
// When you call memoizedSquare(5):
// A new cache object is created.
// It checks if 5 is in the cache (it’s not, because the cache is empty).
// It calculates the result, stores it in the cache, and returns it.

// No State Persistence:
// The cache is recreated every time the function is called, so it doesn’t remember previous results.
// This defeats the purpose of memoization because the function recalculates the result every time.

// Key Difference: Closures Maintain State
// In fun1, the cache object is created once (in the outer function) and persists between function calls because of the closure. This allows the function to "remember" previous results.

// In fun2, the cache object is recreated every time the function is called, so it doesn’t maintain state between calls. This makes memoization useless.
// Why Closures Are Important for Memoization
// State Persistence:
// Closures allow the cache to persist between function calls, so the function doesn’t need to recalculate results for the same inputs.

// Encapsulation:
// The cache is private and only accessible to the inner function. No other part of the code can modify it.

// Efficiency:
// By avoiding redundant calculations, closures make your code faster and more efficient.

// Real-World Analogy:
// Think of the closure as a notebook that the function carries around. Every time the function is called, it checks the notebook first. If the answer is already written down, it uses that. If not, it calculates the answer, writes it down in the notebook, and puts it back in its bag for future use.
// In fun1, the notebook is reused every time, so the function can refer to previous answers. In fun2, the notebook is thrown away after each use, so the function has to start from scratch every time.

// Conclusion:
// fun1 (with closures) is the correct way to implement memoization because it maintains the cache state between function calls.
// fun2 (without closures) fails to maintain state, making memoization ineffective.

// Closures are the key to making memoization work in JavaScript! Let me know if you have more questions. 😊