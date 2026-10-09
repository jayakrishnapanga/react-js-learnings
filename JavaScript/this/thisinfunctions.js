// the value of this is determined by how a function is called. It can't be set by assignment during execution, and it may be different each time the function is called.
// Example 1: this in a Method
// In an object method, this refers to the owner object.
const person={
    name:'Charlie',
    greet:function (){
        console.log('Hello, '+this.name)
    }
}
// why we are getting Hello, Charlie here?
// The greet function is being called in the context of the person object, so this refers to the person object.
// In the greet function, this.name is accessing the name property of the person object.
// Therefore, the output is Hello, Charlie.
person.greet() //Output: Hello, Charlie

const greetFunction=person.greet
// why we are getting undefined here?
// The greet function is being called in the global context, so this is undefined.
// In the greet function, this.name is trying to access the name property of the global object, which doesn't exist.
// To fix this, you can use the bind method to set the this value to the person object.
greetFunction() //Output: Hello, undefined


// Example 2: this in a Function
// In a regular function, this refers to the global object.
function greet(){
    console.log('Hello, '+this.name)
}
// why we are getting Hello, undefined here?
// The greet function is a regular function, so this refers to the global object.
// In the greet function, this.name is trying to access the name property of the global object, which doesn't exist.    


// in strict mode this will be undefined
// this will points to the global object in non-strict mode
function demo(){
    console.log(this) //Output: undefined in strictmode
    //Output: [object Window] in non-strict mode
}
