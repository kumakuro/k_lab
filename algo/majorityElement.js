var majorityElement = function (nums) {
  nums.sort();
  let arr = [], nval = nums[0], nvalCount = 0;
  for (let i in nums) {

    if (nums[i] === nval) {
      nvalCount++;
      if (i * 1 === nums.length - 1) {
        if (nvalCount > parseInt(nums.length / 2)) {
          arr.push(nval)
        }
      }
    }
    if (nums[i] !== nval) {
      if (nvalCount > parseInt(nums.length / 2)) {
        arr.push(nval)
      }
      nval = nums[i];
      nvalCount = 1;
    }
  }
  return arr.length > 1 ? arr : arr[0]
};
let arr = [1, 1, 1, 2, 2, 2, 2];
console.log(majorityElement(arr))