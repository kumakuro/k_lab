var rob = function (nums) {
  let idx, count = 0;
  for (let i in nums) {
    console.log(i, nums[i])
  }
  return count
};

console.log(rob([2, 1, 1, 2]))