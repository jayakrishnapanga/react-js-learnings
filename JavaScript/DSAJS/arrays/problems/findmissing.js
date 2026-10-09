function findMissingNumber(nums) {
  // Your implementation
  let n = nums.length;
  console.log(n);
  let expectedsum = (n * (n + 1)) / 2;
  let totalsum = 0;
  for (let i = 0; i < nums.length; i++) {
    totalsum = totalsum + nums[i];
  }
  console.log(expectedsum);
  console.log(totalsum);
  return expectedsum - totalsum;
}

//For the purpose of user debugging.

findMissingNumber([3, 0, 1]);
