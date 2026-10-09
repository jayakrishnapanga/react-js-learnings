// Arrow Functions and this:
// Arrow functions do not have their own this context. Instead, they inherit this from the parent scope at the time they are defined.
// In your example, the say method is an arrow function, so it doesn't have its own this. Instead, it uses the this value from the surrounding scope where it was defined.

// Global Scope in Browser vs Node.js:
// In the Browser:
// When you run this code in a browser, the surrounding scope of the arrow function is the global scope, which is the window object. Therefore, this inside the arrow function refers to the window object.
// In Node.js:
// When you run this code in Node.js, the surrounding scope of the arrow function is the module scope, which is an empty object ({}). Therefore, this inside the arrow function refers to an empty object {}.


// case1:
// const person={
//     name:'Charlie',
//     greet:()=>{
//         console.log(this)
//     }
// }

// person.greet() //Output: Hello, [object Window]

// case2
const person={
    name:'Charlie',
    greet:function(){
            const demo1=()=>{
                console.log(this)
            }
           function demo2(){
                console.log(this)
            }
            // demo1()
            return demo2
    }
}
person.greet() //Output: Hello, [object Object]
const x=person.greet()()

