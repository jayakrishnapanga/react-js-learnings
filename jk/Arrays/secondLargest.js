function secondLargest(arr) {
  let firstmax = -Infinity;
  let secondmax = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > firstmax) {
      firstmax = arr[i];
    } else if (arr[i] > secondmax && arr[i] < firstmax) {
      secondmax = arr[i];
    }
  }
  return secondmax
}

let arr = [1, 2, 3, 40, 5, 60, 89, 5, 78, 9];


console.log("seondlargest value",secondLargest(arr))