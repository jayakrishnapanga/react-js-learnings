function parent(){

}

parent.prototype.propertiestochild="land cash things you have to full fill"
parent.prototype.cash=500000
parent.prototype.land="10acres"
parent.prototype.marry=function(){
    console.log("you have to marry the subbalaxmiii")
}

function child(){
 
}
child.prototype=Object.create(parent.prototype)
// child.prototype.__proto__=parent.prototype // both line 21 nad 22 behaviour is same 
// but if you use line17 you don't need add the constructor property explictly
child.prototype.constructor=child
child.prototype.marry=function(){
    console.log("no i want marry 3sha")
    console.log("no i want marry 9tara")
    console.log("no i want marry 4me")
}
const c1=new child()
c1.marry()
console.log()