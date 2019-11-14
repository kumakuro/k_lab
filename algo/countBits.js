var countBits = function (num) {
  let numArr = []
  for (let i = 0; i <= num; i++) {
    let n = i, count = 0;
    while (n != 0) {
      if (n & 1 === 1) {
        count++;
      }
      n >>= 1;
    }
    numArr.push(count)
  }
  return numArr
};

console.log(countBits(5))