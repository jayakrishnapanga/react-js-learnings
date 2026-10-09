
// In JavaScript, if a function doesn't explicitly return a value, it implicitly returns undefined

function greet(wish="hello"){
    console.log(wish);
    return wish; // if we don't return anything, it will return undefined
}

console.log(greet("hi"));
console.log(greet());