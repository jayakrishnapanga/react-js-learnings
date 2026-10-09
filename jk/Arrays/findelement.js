let arr = [1, 2, 3, 4, 5, 6];

function findElement(target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == target) {
      return i;
    }
  }
  return -1;
}

console.log(findElement(9));
