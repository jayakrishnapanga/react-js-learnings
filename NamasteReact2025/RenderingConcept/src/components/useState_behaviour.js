
import { use, useState } from "react";

export function Counter() {
    let [count, setCount] = useState(0);
    console.log(useState("j"))
    function updateWithoutPrev() {
        console.log("withoutpreviousvalue")
        console.log(count)
        count=count+10
        setCount(count + 1);
        // setCount(count + 1);
        // setCount(count + 1);
    }
   const heading=<h1>heello biswajit</h1>
   console.log("heading object",heading)
   console.log("headingtype",typeof heading)
    function updateWithPrev() {

        // How Functional Updates Work
        // Key Difference: Instead of relying on the closure's count, it asks React:
        // "Give me the most recent pending value of count, then update it"
        console.log("with previous value")
        setCount(prevCount => prevCount + 1);
        setCount(prevCount => prevCount + 1);
        setCount(prevCount => prevCount + 1);
   
    }

    return (
        <div>
            <h2>Count: {count}</h2>
            <button onClick={updateWithoutPrev}>Without prevState</button>
            <button onClick={updateWithPrev}>With prevState</button>
            <section></section>
        </div>
    );
}



// Deep Dive: How Closures Trap Stale State in React (and How Functional Updates Fix It)
// Let's break this down completely to understand why stale closures happen in React state updates and how functional updates solve this problem at a fundamental level.

// 1. The Core Problem: JavaScript Closures in React
// What is a Closure?
// A closure is a function that "remembers" its lexical scope even when executed outside that scope. In React, every event handler/effect is a closure that captures the state values from when it was created.

// How This Causes Stale State


// function Counter() {
//   const [count, setCount] = useState(0);

//   const increment = () => {
//     // This `count` is frozen when increment is created
//     setCount(count + 1); 
//   };
  
//   return <button onClick={increment}>Count: {count}</button>;
// }
// Key Insight: The increment function closes over the count value from when it was created. On subsequent renders, even though count changes, the increment function still sees the old value.

// 2. Deep Dive: What Happens Internally
// Initial Render (Mounting)
// useState(0) initializes count = 0

// React creates the increment function:



// const increment = () => {
//   // CLOSURE: count is 0 here forever
//   setCount(count + 1); // setCount(0 + 1)
// };
// After First Click
// increment executes with its stale closure (count=0)

// React schedules an update: count = 1

// Component re-renders with new count = 1

// A new increment function is created (but the old one is still in memory, attached to the button click)

// Second Click Problem
// The button is still using the original increment (from first render)

// That function still has count=0 in its closure:


// // Original increment (stale)
// () => setCount(0 + 1); // Oops! Should be 1 + 1
// 3. Why Functional Updates Solve This
// How Functional Updates Work


// const increment = () => {
//   setCount(prevCount => prevCount + 1);
// };
// Key Difference: Instead of relying on the closure's count, it asks React:

// "Give me the most recent pending value of count, then update it"

// React's Update Queue Mechanism
// When you call setCount(prev => prev + 1):

// React adds this to its update queue

// The updater function prev => prev + 1 doesn't close over count

// When processing updates:

// React applies each update in order, passing the latest value:


// Initial: 0
// Update: prev=0 → 1
// Update: prev=1 → 2
// Update: prev=2 → 3
// 4. Memory & Execution Flow Comparison
// Stale Closure (Broken)

// Render 1:
// - count = 0
// - increment = () => setCount(0 + 1) // Closure captures count=0

// Click 1:
// - Runs increment (count=0)
// - Updates count to 1
// - Re-render

// Render 2:
// - count = 1
// - New increment = () => setCount(1 + 1) // But button still uses OLD increment!

// Click 2:
// - Runs OLD increment (count=0)
// - Updates count to 1 (again) // Bug!
// Functional Update (Correct)

// Render 1:
// - count = 0
// - increment = () => setCount(prev => prev + 1) // No stale closure

// Click 1:
// - Queues update: prev=0 → 1
// - Re-render with count=1

// Click 2:
// - Queues update: prev=1 → 2 // Always gets latest value
// 5. Real-World Analogies
// Stale Closure = Frozen Snapshot
// Imagine taking a photo of a whiteboard (state) at 9AM. Even if someone changes the whiteboard later, your photo still shows the 9AM content.

// Functional Update = Live Whiteboard
// Instead of looking at your photo, you ask:

// "What's on the whiteboard RIGHT NOW? Let me add 1 to that."

// 6. When This Matters Most
// Async Code (Timeouts, Promises)

// setTimeout(() => {
//   setCount(count + 1); // Stale!
// }, 1000);
// Fix:

// setTimeout(() => {
//   setCount(prev => prev + 1); // Fresh!
// }, 1000);
// Multiple Sequential Updates


// setCount(count + 1);
// setCount(count + 1); // Both use stale value
// vs


// setCount(prev => prev + 1);
// setCount(prev => prev + 1); // Chains properly
// Event Listeners


// window.addEventListener('resize', () => {
//   setCount(count + 1); // Stale after re-renders
// });

// Closures in React capture state values when functions are created.

// Stale closures occur when event handlers/effects use outdated state.

// Functional updates (prev => newValue) always get the latest state from React's queue.

// This pattern is critical for async operations and sequential updates.

// When to Use Each
// Situation	Approach
// Single, independent update	setCount(newValue)
// Updates depending on previous state	setCount(prev => newValue)
// Async operations (timeouts, promises)	Always functional updates

