function abc(a,b){
    this.a=a
    this.b=b
    
}
abc.prototype.x=demo
function demo(){
    return this.a+this.b
}

const obj=new abc();
const obj1=new abc(10,20);
console.log(obj)
console.log(obj.x());
console.log(obj1.x());
obj.a=10
console.log(obj)