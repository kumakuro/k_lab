var missingNumber = function (nums) {
  let num = null;
  for (let i = 0; i < nums.length; i++) {
    if (nums.indexOf(i) == -1) num = i;
  }
  if (num === null) {
    num = nums.length
  }
  return num;
};


let arr = [
  [3, 0, 1],
  [0],
  [0, 1, 2],
  [1],
  [9, 6, 4, 2, 3, 5, 7, 0, 1]
]


for (let i in arr) {
  console.log(missingNumber(arr[i]))
}