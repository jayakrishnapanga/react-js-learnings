/**
 * MODULE PATTERN — Encapsulate private state using closures (JavaScript idiom).
 *
 * Interview: "How does Node module privacy work?"
 * Answer: module.exports exposes public API; everything else is private via closure.
 *
 * This is not a classic GoF pattern but appears constantly in JS interviews.
 *
 * Trade-offs:
 *   + True privacy in JS (before #private fields)
 *   - Harder to test private functions; prefer explicit exports for testability
 */

function createCounter(initialValue = 0) {
  let count = initialValue; // private — not accessible from outside

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getValue() {
      return count;
    },
    reset() {
      count = initialValue;
      return count;
    },
  };
}

// Revealing Module Pattern — explicitly name what's public
const ShoppingCartModule = (() => {
  const items = new Map(); // private

  function addItem(productId, qty) {
    items.set(productId, (items.get(productId) || 0) + qty);
  }

  function getTotalItems() {
    return [...items.values()].reduce((sum, qty) => sum + qty, 0);
  }

  function clear() {
    items.clear();
  }

  // Public API
  return { addItem, getTotalItems, clear };
})();

// Node.js CommonJS — same idea
// counter.js exports only { increment, getValue }; count stays private

// --- Demo ---
const counter = createCounter(10);
console.log(counter.increment()); // 11
console.log(counter.increment()); // 12
console.log(counter.getValue());  // 12
// console.log(counter.count);    // undefined — private!

ShoppingCartModule.addItem('laptop', 1);
ShoppingCartModule.addItem('mouse', 2);
console.log('Total items:', ShoppingCartModule.getTotalItems()); // 3
