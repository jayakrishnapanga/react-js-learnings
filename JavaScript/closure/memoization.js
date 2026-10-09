// function square(n){
//     return n*n
// }

// console.log(square(5)) 
// console.log(square(3))
// console.log(square(5))

// the above square function will calculate even if you are calling the square(5)
//by any no of times 
// it's not needed to calculate, if you already know the value for given input 
// here memoization and caching comes

// function memozioedSquare(num){
//     let cache={}
//     if(num in cache){
//         console.log("present in cache returning from cache")
//         return cache[num]
//     }else{
//         console.log("calculating ...")
//         cache[num]=num *num
//         return cache[num]
//     }
// }

function memozioedSquare(num){
    let cache={}
    return function(num){
        if(num in cache){
            console.log("present in cache returning from cache")
            return cache[num]
        }else{
            console.log("calculating ...")
            cache[num]=num *num
            return cache[num]
        }
    }
}
const squaurefunc=memozioedSquare()
console.log(squaurefunc(5)); // Output: Calculating... 25
console.log(squaurefunc(5)); // Output: Returning cached result... 25