var isValid = function (s) {
  let lArr = ['{', '(', '['],
    rArr = ['}', ')', ']'],
    sArr = s.split(''),
    fArr = [];

  for (let i in sArr) {
    if (lArr.indexOf(sArr[i]) > -1) {
      fArr.push(lArr.indexOf(sArr[i]))
    }
    if (rArr.indexOf(sArr[i]) > -1) {
      if (fArr[fArr.length - 1] === rArr.indexOf(sArr[i])) {
        fArr.splice(fArr.length - 1, 1)
      } else {
        fArr.push(rArr.indexOf(sArr[i]))
      }
    }
  }

  return fArr.length > 0 ? false : true
}

let arr = [
  "}",
  "()",
  "()[]{}",
  "(]",
  "([)]"
]

for (let i in arr) {
  console.log(isValid(arr[i]))
}