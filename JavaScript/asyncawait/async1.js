// here in this example you are not returning a promise just returning the normal string
// then in this v8 implicitly return a promise 


// When you define an async function in JavaScript, it implicitly wraps the returned value in a Promise. This means that even if you return a plain value (like a string, number, or object), it gets automatically converted into a resolved Promise
async function getData() {
    return "Namaste"; // Implicitly resolved as Promise.resolve("Namaste")
}

const data = getData(); // `data` is a Promise
console.log(data); // Logs: Promise { <fulfilled>: "Namaste" }

