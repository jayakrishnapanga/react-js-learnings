function chunkArray(arr, n) {
  // Your implementation
  let outputarr = [];
  for (let i = 0; i < arr.length; i += n) {
    outputarr.push(arr.slice(i, i + n));
  }
  return outputarr;
}

//For the purpose of user debugging.
//pass your array and chunk size in function call
console.log(chunkArray([1, 2, 3, 4, 5], 2));
