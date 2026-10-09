function parent(){

}

parent.protoype.propertiestochild="land cash things you have to full fill"
parent.prototype.cash=500000
parent.prototype.land="10acres"
parent.prototype.marry=function(){
    console.log("you have to marry the subbalaxmiii")
}


function child(){
 
}
// child.prototype.enjoy=function(){
//       console.log("my lige my own way i enjoy it")
// }
//in line 16 we are assigning the enjoy function to child prototype it will added their

child.prototype=Object.create(parent.prototype)
// child.prototype.__proto__=parent.prototype // both line 21 nad 22 behaviour is same
child.prototype.constructor=child
child.prototype.enjoy=function(){
    console.log("my lige my own way i enjoy it")
}
const c1=new child()

console.log(c1.enjoy())// you get error enjoy is not a function 
//because in line 16 added to prototype and in line21 you are updating that child.prototype=Object.create(parent.prototype) with parent prototype
// then in this case it will over rided so it not present 

// if you wnat to use that then you have to add after line 21
// then in this case you won't get error and it work




 
// Case 1: Child.prototype.__proto__ = Parent.prototype;

Child.prototype.__proto__ = Parent.prototype;
// 🔹 What happens here?
// Child.prototype is an object by default and has:

Child.prototype = {
    constructor: Child, // Default property
    __proto__: Object.prototype // By default, it inherits from Object.prototype
};
// When you do Child.prototype.__proto__ = Parent.prototype;, you're modifying __proto__ so that it now points to Parent.prototype instead of Object.prototype.
// Key point: Since we haven’t replaced Child.prototype, the constructor property is still there, so there’s no need to manually reset constructor.
// ✅ Constructor remains intact
// Since Child.prototype was not replaced, its constructor property still correctly points to Child.


// Case 2: Child.prototype = Object.create(Parent.prototype);

// Child.prototype = Object.create(Parent.prototype);
// Child.prototype.constructor = Child;
// 🔹 What happens here?
// Object.create(Parent.prototype) creates a new object with Parent.prototype as its prototype:

Child.prototype = {
    __proto__: Parent.prototype // It inherits from Parent.prototype
};
// This new object does not have a constructor property.
// That’s why we manually restore the constructor:


Child.prototype.constructor = Child;

// ❌ Constructor is lost
// Object.create(Parent.prototype) replaces Child.prototype with a new object.
// This new object doesn’t have a constructor property (because Object.create() does not copy properties).
// So, we manually fix it by setting Child.prototype.constructor = Child.
// Summary of Your Understanding
// Approach	What Happens	Need to Reset constructor?
Child.prototype.__proto__ = Parent.prototype;	//Keeps Child.prototype intact, just modifies __proto__.	❌ No, because constructor is unchanged.
Child.prototype = Object.create(Parent.prototype);	//Creates a new object that inherits from Parent.prototype.	✅ Yes, because constructor is missing.
// Which One is Better?
// Child.prototype = Object.create(Parent.prototype); is better because it is the standard way to implement inheritance.
// Modifying __proto__ directly (Child.prototype.__proto__ = Parent.prototype;) works, but it’s less common and slightly less performant.