
// If var is declared outside any function (but inside a block), it still gets hoisted to the global scope (or the nearest function scope if inside a function).


console.log(c)

{
    console.log("hello jk")
    console.log("hello mjk")
    let a=10
    const b=20
    var c=30
}


// here in the above example the var c is hoisted to the top of the block and it is available to the block and outside the block also  but let and const are block scoped so they are not available outside the block