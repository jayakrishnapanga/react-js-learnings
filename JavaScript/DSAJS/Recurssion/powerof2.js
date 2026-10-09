function isPowerOfTwo(n) {
  if (n / 2 == 1 || n == 1) {
    return true;
  } else if (n % 2 != 0) {
    return false;
  } else if (n / 2 < 1) {
    return false;
  }
  return isPowerOfTwo(n / 2);
}

console.log(isPowerOfTwo(32))
