// let arr = [-4, -2, 1, 5, -1, -7, 2, 3];
let arr = [2, 3, -8, 7, -1, 2, 3];
function maxsumSubarray(arr) {
  let maxSum = arr[0];
  let currentSum = arr[0];
  let start = 0;
  tempstart = 0;
  let end = 0;
  for (i = 1; i < arr.length; i++) {
    currentSum = Math.max(arr[i], currentSum + arr[i]);
    if (arr[i] > currentSum + arr[i]) {
      maxSum = arr[i];
      tempstart = i;
    } else {
      currentSum += arr[i];
      end = i;
    }
    if (currentSum > maxSum) {
      maxSum = currentSum;
      start = i;
    }
  }
  console.log(start);
  console.log(end);
  return { maxSum, subarray: arr.splice(start, end - 1) };
}

console.log(maxsumSubarray(arr));
