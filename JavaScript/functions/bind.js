// ex1
// function greet(greeting, punctuation) {
//     console.log(greeting + ', ' + this.name + punctuation);
// }

// const person = {
//     name: 'Charlie'
// };

// const greetCharlie = greet.bind(person, 'Hey');
// greetCharlie('!'); // Output: Hey, Charlie!
// console.log(greetCharlie) // Output: [Function: bound greet]






// What is bind?
// The bind method is like creating a copy of a function with a fixed this value (the context) and, optionally, some pre-set arguments. It doesn't call the function immediately—it just prepares the function to be called later with the fixed context and arguments.

// Why is bind useful?
// In JavaScript, the value of this can change depending on how a function is called. Sometimes, you want to "lock" the value of this to a specific object, so it doesn't change unexpectedly. That's where bind comes in.

// How does bind work?
// Fixes this: You tell bind what object you want this to refer to inside the function.

// Optional pre-set arguments: You can also "pre-fill" some of the function's arguments if you want.

// Returns a new function: bind doesn't call the function right away. Instead, it returns a new function that you can call later.

// Example 1: Fixing this
// Imagine you have a function that uses this, but you want to make sure this always refers to a specific object.

const person = {
    name: 'Alice',
    greet: function() {
        console.log('Hello, ' + this.name);
    }
};

// If we call person.greet(), it works fine:
person.greet(); // Output: Hello, Alice

// But if we take the function out and call it, `this` is lost:
const greetFunction = person.greet;
greetFunction(); // Output: Hello, undefined (because `this` is no longer `person`)
// Here’s where bind helps:

// Use bind to fix `this` to `person`
const boundGreet = person.greet.bind(person);

// Now, even if we call it separately, `this` is still `person`
boundGreet(); // Output: Hello, Alice
// Example 2: Pre-setting arguments
// You can also use bind to "pre-fill" some arguments of a function.


function add(a, b) {
    return a + b;
}

// Use bind to create a new function where `a` is always 10
const addTen = add.bind(null, 10); // `null` means we don't care about `this`

console.log(addTen(5)); // Output: 15 (10 + 5)
console.log(addTen(20)); // Output: 30 (10 + 20)
// Here, bind creates a new function (addTen) where the first argument (a) is always 10. When you call addTen, you only need to provide the second argument (b).

// Key Points to Remember:
// bind doesn't call the function: It just creates a new function with a fixed this and optional pre-set arguments.

// Useful for callbacks: If you're passing a function as a callback (e.g., in event listeners), bind ensures this doesn't get lost.

// Pre-setting arguments: You can use bind to create specialized versions of a function with some arguments already filled in.

// Real-Life Example: Event Listeners

const button = document.querySelector('button');

const user = {
    name: 'Bob',
    handleClick: function() {
        console.log('Button clicked by ' + this.name);
    }
};

// Without bind, `this` would be the button element, not `user`
button.addEventListener('click', user.handleClick.bind(user));
// Here, bind ensures that when the button is clicked, this inside handleClick refers to the user object, not the button.

// Summary:
// bind creates a new function with a fixed this and optional pre-set arguments.

// It’s useful for ensuring this doesn’t change unexpectedly, especially in callbacks or event handlers.

// It doesn’t call the function immediately—it just prepares it for later use.

