
console.log(x);// reference error
function demohoistingOFvar(){
    console.log(x);
    var x = 10;
    console.log(x);
}