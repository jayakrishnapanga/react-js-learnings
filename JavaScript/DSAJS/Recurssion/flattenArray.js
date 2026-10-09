let result = [];

function flattenArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!Array.isArray(arr[i])) {
      result.push(arr[i]);
    } else {
      flattenArray(arr[i]);
    }
  }
}

//For the purpose of user debugging.
// [1, [2, [3, 4], 5], 6]
let arr=[1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
flattenArray(arr);
console.log(result);
