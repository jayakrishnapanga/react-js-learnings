


// case1 
console.log(undvar);
console.log(getName)
getName("umesh",13); 

var undvar= 20;  

function getName(peru,num) {
    var ans=10*num
    console.log(`hello my name is ${peru+ans}`);  
}

console.log(undvar);
getName("umesh",13); 









//  case2
var undvar= 20;  

 console.log(getName)// you will get error 
console.log(assingTovariable) //you will get error 

var assingTovariable =function getName(peru,num) {
    var ans=10*num
    console.log(`hello my name is ${peru+ans}`);  
}

 // writing arrow function
var getName=()=>{
    var ans=10*num
    console.log(`hello my name is ${peru+ans}`);  

}

 // if you access after declaration you don't get error 

console.log(getName)
console.log(assingTovariable) 