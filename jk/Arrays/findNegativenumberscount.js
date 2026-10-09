function findNegativeNumbersCount(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 0) {
      count++;
    }
  }
  return count;
}

console.log(findNegativeNumbersCount([1, 9, 2, -4, 5, -8, -7, 9, 0]));
