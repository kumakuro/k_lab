let strArr = ["leetcode", "loveleetcode"];

var firstUniqChar = function (s) {
  let uniNumArr = [];
  for (let i = 0; i < s.length; i++) {
    if (i === s.indexOf(s[i])) {
      uniNumArr.push(0);
    } else {
      uniNumArr.push(3)
      uniNumArr[s.indexOf(s[i])] = 3
    }
  }
  return uniNumArr.indexOf(0);
};


// console.log(firstUniqChar(strArr[1]))

for (let i in strArr) {
  console.log(firstUniqChar(strArr[i]))
}