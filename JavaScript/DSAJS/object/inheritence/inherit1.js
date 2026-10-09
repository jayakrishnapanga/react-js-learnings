// function parent(){

// }
// parent.prototype.properties={
//     cash:5000000,
//     lands:"5acres",
//     marry:function(){
//         console.log("you have to marry subbalaxmii")
//     }
// }
// console.log(parent.prototype)


// function child(){

// }

// console.log(child.prototype)
// child.__proto__=parent.prototype

// console.log(child.__proto__)

// const c1=new child()

// c1.marry()


function Parent() {} // Parent class constructor

// Attach properties/methods directly to Parent's prototype
Parent.prototype.cash = 5000000;
Parent.prototype.lands = "5 acres";
Parent.prototype.marry = function () {
    console.log("You have to marry Subbalaxmi");
};

console.log(Parent.prototype); // Parent's prototype

function Child() {} // Child class constructor

// Correct way to inherit Parent's prototype
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child; // Reset constructor reference

console.log("line 45",Child.prototype); // Child's prototype after inheritance

const c1 = new Child();
c1.marry(); // ✅ Output: "You have to marry Subbalaxmi"
console.log(c1.cash); // ✅ Output: 5000000
console.log(c1.lands); // ✅ Output: "5 acres"
console.log(c1.__proto__ === Parent.prototype); //false
console.log(c1.__proto__)
console.log(Parent.prototype)