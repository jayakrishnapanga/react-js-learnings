// for...of loop (Value-based loop)
// Directly iterates over values (without needing an index).
// Works on iterable objects (arrays, strings, Maps, Sets, etc.).
// Cannot modify the original array directly (without accessing the index).

let arr= [10,20,30,40,50]

for (let num of arr){
    console.log(num)
}
for(let i=0; i<arr.length;i++){
    console.log(arr[i])
}

// difference em ledhu  for loop motham control isthadhi and you can modify that array using index
// adhey for..of nuv just values thechukuntav anthey nuv array in  modify cheyalevv 

// let str = "hello"
// for (let char of str){
//     console.log(char)
// }
// for...of loop is not limited to arrays; it can also be used with other iterable objects like strings, Maps, Sets, etc.
// For example, you can use it with a string:
let str = "hello"  
for (let char of str) {
    console.log(char);
}
// In this case, the loop iterates over each character in the string, printing them one by one.
let map = new Map([["a",1],["b",2],["c",3]])
for (let [key, value] of map) {
    console.log(key, value);
}
// In this case, the loop iterates over each key-value pair in the Map, printing them one by one.
// For...of loops are also useful for iterating over Sets:
let set = new Set([1, 2, 3, 4, 5]);
for (let value of set) {
    console.log(value);
}
// In this case, the loop iterates over each value in the Set, printing them one by one.
// For...of loops are generally more readable and concise than traditional for loops, especially when working with iterable objects.
// They also help avoid common pitfalls associated with traditional for loops, such as off-by-one errors and index management.
// However, they are not suitable for all scenarios. For example, if you need to modify the original array or access the index of each element, a traditional for loop or forEach() method may be more appropriate.