var isPowerOfTwo = function (n) {
  let flag = true, result = 0, prev = 0;
  for (let i = 0; flag; i++) {
    if (i === 0) {
      result = 1;
    }
    if (i === 1) {
      result = 2;
    }
    if (i > 1) {
      result = result * 2;
    }
    if (result > n) {
      flag = false
    }
    if (result === n) {
      break
    }
  }
};