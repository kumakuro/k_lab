let strArr = [
  ["anagram", "anagram"],
  ["rat", "car"],
  ["ab", "a"]
]

var isAnagram = function (s, t) {
  if (s.length != t.length) return false;
  
  let sStr = s.split(''),
    tStr = t.split('');
  for (let i in sStr) {
    let idx = tStr.indexOf(sStr[i])
    if (idx > -1) {
      tStr.splice(idx, 1)
    }
  }
  return tStr.length > 0 ? false : true;
};



for (let i in strArr) {
  let stm = strArr[i]
  console.log(isAnagram(stm[0], stm[1]))
}