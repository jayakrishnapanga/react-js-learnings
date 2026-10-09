const obj={

}
console.log(obj);

function demo(){
    console.log("Hello");
}
console.log(demo);
console.log(demo.prototype);
console.log(typeof obj.__proto__);
console.log(obj.__proto__ instanceof obj)