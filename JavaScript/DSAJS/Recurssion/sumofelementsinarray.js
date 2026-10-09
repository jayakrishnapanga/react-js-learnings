let arr = [1, 2, 3, 4, 5, 6, 7];
// // let sum = 0;

// // for (let i = 0; i < arr.length; i++) {
// //   sum += arr[i];
// // }
// // console.log(sum);

// function sumelments(arr, len) {
//   if (len ==0) {
//     return arr[0] or arr[len];
//   }
//   return arr[len] + sumelments(arr, len - 1);
// }
// console.log(sumelments(arr, arr.length - 1));

// sum of odd numbers in arr using the recurssion

function sumelmentsOdd(arr, len) {
  let isOdd = arr[len] % 2 != 0;
  if (len == 0) {
    if (isOdd) {
      return arr[len];
    } else {
      return 0;
    }
  }
  if (isOdd) {
    return arr[len] + sumelmentsOdd(arr, len - 1);
  } else {
    return sumelmentsOdd(arr, len - 1);
  }
}

console.log(sumelmentsOdd(arr, arr.length - 1));
