var sortedSquares = function (A) {
  const map1 = A.map(x => Math.abs(x * 1)).sort((a, b) => a - b);
  return map1.map(x => x * x)
};

console.log(sortedSquares([-4, -1, 0, 3, 10]))