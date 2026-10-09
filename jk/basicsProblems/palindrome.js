var isPalindrome = function (x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }
  let revnum = 0;
  while (num > 0) {
    revnum = revnum * 10 + Math.floor(num % 10);
    num = Math.floor(num / 10);
  }
  if (revnum === x) {
    return true;
  } else {
    return false;
  }
};
let num = 120;
console.log("the value of palindrome or not", isPalindrome(num));

// other approach
// var isPalindrome = function (x) {
//   let value = x.toString();
//   let result = value.split("").reverse().join("");
//   return value === result;
// };
