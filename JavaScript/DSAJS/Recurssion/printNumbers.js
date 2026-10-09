function printNumbers(n) {
  if (n == 0) {
    return 0;
  }
  console.log(n); // try to understand how this log works
  printNumbers(n - 1);
  console.log(n); // try to understand how this log works
}
printNumbers(5);
