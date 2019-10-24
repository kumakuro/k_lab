var singleNumber = function (nums) {
  let num;
  for (let i = 0; i < nums.length; i++) {
    let temp = nums[i];
    for (let j = 0; i < j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        continue;
      } else {
        num = nums[i]
      }
    }
  }
  return num;
};
let arr = [4, 1, 2, 1, 2]
console.log(singleNumber(arr))