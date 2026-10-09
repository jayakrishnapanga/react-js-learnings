

// Calling Parent’s Method Using Parent.prototype.method.call(this)
// When a child class overrides a parent method, we might still want to call the original (parent) method inside the overridden method. 
// This is where call(this) comes in.


// How call(this) Works?
// Parent.prototype.method.call(this) explicitly calls the parent’s method in the context of the child instance (this refers to the child object).
// This ensures the parent’s method executes properly, even though we are inside the child’s overridden method.




function Parent(){

}

parent.prototype.propertiestochild="land cash things you have to full fill"
parent.prototype.cash=500000
parent.prototype.land="10acres"
parent.prototype.marry=function(){
    console.log("you have to marry the subbalaxmiii")
}

function Child(){
 
}
Child.prototype=Object.create(parent.prototype)
// child.prototype.__proto__=parent.prototype // both line 21 nad 22 behaviour is same 
// but if you use line17 you don't need add the constructor property explictly
Child.prototype.constructor=child
Child.prototype.marry=function(){
    Parent.prototype.marry.call(this); // Call parent's method
    console.log("But I will marry Priyanka, not Subbalaxmi!");
    // console.log("no i want marry 3sha")
    // console.log("no i want marry 9tara")
    // console.log("no i want marry 4me")
}
const c1=new child()
c1.marry()
console.log()






// What’s Happening Here?
// Child.prototype.marry overrides the parent’s marry method.
// Inside the child’s marry method, we call:

// Parent.prototype.marry.call(this);
// This runs the marry() method from the Parent prototype.
// this refers to the child instance, so Parent.prototype.marry executes as if it belongs to the child.
// After calling the parent’s method, we execute the additional statement:

// console.log("But I will marry Priyanka, not Subbalaxmi!");
// Final output shows both the parent’s and child’s behavior.
