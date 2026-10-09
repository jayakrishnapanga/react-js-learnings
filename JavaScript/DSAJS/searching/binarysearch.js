function Binarysearch(nums, target) {
  let start = 0;
    let end = nums.length - 1;
  let mid = Math.floor((start + end) / 2);

  while (start <= end) {
    if (nums[mid] == target) {
      return mid;
    }
    if (nums[mid] > target) {
      end = mid - 1;
      mid = Math.floor((start + end) / 2);
    } else {
      start = mid + 1;
      mid = Math.floor((start + end) / 2);
    }
  }
  return -1;
}

nums = [-1, 0, 3, 5, 9, 12];
target = 9;
console.log(Binarysearch(nums, target));