function parent() {}

parent.prototype.propertiestochild = "land cash things you have to full fill";
parent.prototype.cash = 500000;
parent.prototype.land = "10acres";
parent.prototype.marry = function () {
  console.log("you have to marry the subbalaxmiii");
};

function child() {}
child.prototype.enjoy = function () {
  console.log("my lige my own way i enjoy it");
};
//in line 16 we are assigning the enjoy function to child prototype it will added their

// child.prototype=Object.create(parent.prototype)
// child.prototype.constructor=child
child.prototype.__proto__ = parent.prototype;
// if you use like this then you need to write the  line 22
// child.prototype.enjoy=function(){
//     console.log("my lige my own way i enjoy it")
// }
const c1 = new child();

console.log(c1.enjoy());
