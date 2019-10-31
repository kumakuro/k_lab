var moveZeroes = function (nums) {
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != 0) {
      nums[j++] = nums[i]
    }
  }
  while (j < nums.length) {
    nums[j++] = 0;
  }
};

let arr = [-1, 5, -2, 3, -2, 0, 23, 5, -5, -2, -13, 5, 0, 1, 0, 3, 12]
moveZeroes(arr)
console.log(arr)