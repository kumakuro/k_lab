var findErrorNums = function (nums) {
  let arr = nums.sort(), matchArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != i + 1) {
      console.log(i, arr[i])
    }
  }
  return matchArr
};

let arr = [
  [2, 2],
  [1, 2, 2, 4],
  [1, 2, 3, 4, 5, 6, 2, 8, 9]
]

for (let i in arr) {
  console.log(findErrorNums(arr[i]))
}
