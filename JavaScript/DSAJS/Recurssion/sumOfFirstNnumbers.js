function sumOfFirstNNaturalNumbers(n) {
  if (n == 0) {
    return 0;
  }
  return n + sumOfFirstNNaturalNumbers(n-1);
}

console.log(sumOfFirstNNaturalNumbers(5));

