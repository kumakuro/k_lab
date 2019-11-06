var transpose = function (A) {
  let B = [];

  for (let i in A[0]) {
    let hrr = [];
    hrr.push(A[0][i])
    for (let j = 1; j < A.length; j++) {
      if (A[j][i] != undefined) {
        hrr.push(A[j][i])
      }
    }
    if (hrr.length === A.length) {
      B.push(hrr)
    }
  }
  return B;
};


let arr = [
  [1, 2, 3],
  [4, 5],
  [7, 8, 9]
]
let arr2 = [
  [-51, 36, -31, 23],
  [3, 12, -31, 65],
  [-20, 2, -42, -62],
  [0, -49, 75, 77],
  [-52, 46, 45, 37],
  [-98, 17, 14, 78],
  [50, 88, -15, -31],
  [84, -59, -96, 23],
  [42, 1, 48, 81],
  [-92, 95, -71, 37]
]

let answer2 = [
  [-51, 3, -20, 0, -52, -98, 50, 84, 42, -92],
  [36, 12, 2, -49, 46, 17, 88, -59, 1, 95],
  [-31, -31, -42, 75, 45, 14, -15, -96, 48, -71],
  [23, 65, -62, 77, 37, 78, -31, 23, 81, 37]
]

let ans = transpose(arr2)
console.log(ans, typeof ans, typeof answer2, ans === answer2)