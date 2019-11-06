var repeatedNTimes = function (A) {
  let num;
  for (let i in A) {
    let count = 0;
    for (let j in A) {
      if (A[j] === A[i]) {
        count++
      }
    }
    if (count * 2 === A.length) {
      num = A[i];
      break;
    }
  }
  return num;
};
let testArr = [
  [1, 2, 3, 3],
  [2, 1, 2, 5, 3, 2],
  [5, 1, 5, 2, 5, 3, 5, 4]
]
console.log(repeatedNTimes(testArr[0]))