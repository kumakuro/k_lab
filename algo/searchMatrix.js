var searchMatrix = function (matrix, target) {
  let booleanTag = false;
  for (let i = 0; i < matrix.length; i++) {
    let itm = matrix[i];
    for (let j = 0; j < itm.length; j++) {
      if (itm[j] === target) {
        booleanTag = true;
      }
      if (itm[j] > target) {
        break;
      }
    }
  }
  return boo
};
let matrix = [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
console.log(searchMatrix(matrix, 5))