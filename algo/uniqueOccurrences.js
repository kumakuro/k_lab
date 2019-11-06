var uniqueOccurrences = function (arr) {
  let flag = true,
    arr1 = [],
    arr2 = [];
  for (let i in arr) {
    if (arr1.indexOf(arr[i]) == -1) {
      arr1.push(arr[i])
      arr2.push(1)
    } else {
      arr2[arr1.indexOf(arr[i])]++
    }
  }
  arr2.map((itm, idx) => {
    if (idx != arr2.indexOf(itm)) flag = false
  })

  return flag;
};
let arr = [
  [1, 2, 2, 1, 1, 3, 2],
  [1, 2],
  [-3, 0, 1, -3, 1, 1, 1, -3, 10, 0]
]

let answer = [false, false, true]

console.log(uniqueOccurrences(arr[2]))