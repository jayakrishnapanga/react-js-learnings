// approach 1: Using built-in methods
let str1 = "Javascript is fun";
// let charArray = str1.split(''); // Convert string to array of characters
// console.log("the char array",charArray); // For debugging, to see the character array
// let j=charArray.length-1;
// for (let i=0;i<j;i++){
//     let temp=charArray[i];
//     charArray[i]=charArray[j];
//     charArray[j]=temp;
//     j--;
// }
// console.log("the final rev str",charArray.join('')); // Convert array back to string

// approach 2: Using a loop
let reversedStr = "";
for (char of str1) {
  reversedStr = char + reversedStr;
  //   reversedStr = reversedStr + char;
}
console.log("the final rev str", reversedStr); // Output the reversed string
