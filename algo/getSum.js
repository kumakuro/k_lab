var getSum = function (a, b) {
  for (let i = 0; i < Math.abs(b); i++) {
    if (b > 0) {
      a++
    }
    if (b < 0) {
      a--
    }
  }
  return a;
};

console.log(getSum(1, 2))