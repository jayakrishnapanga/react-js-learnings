 var y=1
 var x=1
//  case1
 a()//in  this caseyou get don't get undefined in the output
 b()//in  this caseyou get don't get undefined in the output

//  case2
 console.log(a())//in  this caseyou get undefined also in the output
 console.log(b())//in  this caseyou get undefined also in the output
 function a(){
    var x=10
    console.log(y)
    console.log(x)
 }

 function b(){
    var x=100
    console.log(x)
 }

 function c(){
   var x=500
   console.log(x)
   return x
}


// Explanation to case2
// If you wrap the calls to a() and b() in console.log, like so:
// javascript
// Copy code
// console.log(a());  // Function call to 'a' wrapped in console.log
// console.log(b());  // Function call to 'b' wrapped in console.log
// In this case, each function still logs its local x value (10 and 100), but since the functions return undefined, console.log(a()) and console.log(b()) will each output undefined after the values 10 and 100 are logged. The output would appear as:
// 10
// undefined
// 100
// undefined
// This happens because console.log(a()) first executes a(), which logs 10, and then logs the return value of a() (which is undefined). The same sequence occurs for b().


// Functions a and b in your script each log a value to the console and then implicitly return undefined 
// because they do not have a return statement specifying otherwise. 
// If you are seeing undefined, it could be due to how those function calls are being executed or displayed in your development environment. 
// To avoid confusion, you can separate the function calls from console.log if you're examining outputs directly.


// case3
// in this case if you call
console.log(c()) // output 500 and 500 you don't get undefined because their your function
// returning something ,if your function not returning anyhting then implicitly it returns the undefined 
function c(){
   var x=500
   console.log(x)
   return x
}