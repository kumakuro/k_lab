var getRow = function (numRows) {
  let yhArr = [], ydx = 0;
  while (ydx < numRows + 1) {
    let arr = []
    if (ydx === 0) {
      arr.push(1)
    } else {
      let prevLine = yhArr[ydx - 1];
      for (let i = 0; i < prevLine.length + 1; i++) {
        if (!yhArr) {
          arr.push(1)
        } else {
          if (prevLine[i - 1] && prevLine[i]) {
            arr.push(prevLine[i - 1] + prevLine[i])
          }
          if (!prevLine[i - 1] && prevLine[i]) {
            arr.push(prevLine[i])
          }
          if (prevLine[i - 1] && !prevLine[i]) {
            arr.push(prevLine[i - 1])
          }
        }
      }
    }
    yhArr.push(arr)
    ydx++
  }
  return yhArr[numRows]
};

console.log(getRow(5))