var hammingDistance = function (x, y) {
  let count = 0;
  while (x !== 0 || y !== 0) {
    if ((x & 1) != (y & 1)) {
      count++
    }
    x >>= 1
    y >>= 1
    console.log(x, y)
  }
  return count;
};
console.log(hammingDistance(2, 4))