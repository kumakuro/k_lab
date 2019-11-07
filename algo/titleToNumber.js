var titleToNumber = function (s) {
  let strArr = s.split(''),
    aNum = 'A'.charCodeAt() - 1,
    count = 0;
  for (let i in strArr) {
    let s = strArr[i]
    count += (s.charCodeAt() - aNum) * Math.pow(('Z'.charCodeAt() - aNum), strArr.length - 1 - i * 1)
  }
  return count;
};

console.log(titleToNumber('AAA'))

