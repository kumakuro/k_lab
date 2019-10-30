var hammingWeight = function (n) {
  let hamArr = n.toString(2).split('').filter(itm => itm == 1);
  return hamArr.length
};

console.log(hammingWeight(4))