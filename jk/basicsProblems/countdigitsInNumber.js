function countDigits(num) {
  let count = 0;
  // corner case
  if (num == 0) {
    return 1;
  }
  //corner case
  if (num < 0) {
    num = Math.abs(num);
  }
  while (num > 0) {
    console.log("then quotient", Math.floor(num / 10));
    num = Math.floor(num / 10);
    count++;
  }
  return count;
}

let num = 192;

console.log(countDigits(num));
