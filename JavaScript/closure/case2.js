// function x(){
//     var a = 2;
//     function y(){
//         console.log(a);
//     }
//     y();
// }
// x()


function x(){
    var a = 2;
    let j=35
    function y(){
        console.log(a);
    }
    // y()
    return y;
}

//both are same you can define function inside function and return it
// function x(){
//     var a = 2;
//     let j=35
//     return function y(){
//         console.log(a);
//     }

// }
let ans=x()


console.log(ans); 
console.log("hello")