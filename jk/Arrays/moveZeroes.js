var moveZeroes = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == 0) {
      nums.splice(i, 1);
      nums.push(0);
    }
  }
  return nums;
};

let nums = [1, 0, 3, 0, 5, 6, 7];
console.log("the nums", moveZeroes(nums));
