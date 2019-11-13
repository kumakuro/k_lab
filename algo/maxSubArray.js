var maxSubArray = function (nums) {
  let maxCount = undefined;
  maxArr = [];
  for (let i in nums) {
    let count = 0, countArr = [];
    for (let j = i * 1; j < nums.length; j++) {
      count += nums[j];
      countArr.push(nums[j])
      if (count > maxCount || maxCount == undefined) {
        maxCount = count;
        maxArr = countArr;
      }
    }
  }

  return maxCount;
};


console.log(maxSubArray([-1, 0, -2]))