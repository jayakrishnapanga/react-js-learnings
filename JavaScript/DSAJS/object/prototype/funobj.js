function demo(){
    let a=10
}

const d1=new demo()
console.log(d1) //undefined
console.log(d1.a) //undefined
console.log(d1.__proto__) //{}
console.log(d1.__proto__ === Object.prototype) 
console.log(d1.__proto__ === demo.prototype);
console.log(demo.prototype.__proto__===Object.prototype)


// case2
// function demo(){
//     let a=10
// }

// console.log(Object.getOwnPropertyNames(demo.prototype)) 
// console.log(Object.getOwnPropertyNames(demo.__proto__)) 
// console.log(demo.prototype.__proto__===Object.prototype)