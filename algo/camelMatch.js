var camelMatch = function (queries, pattern) {
  let booleanArr = [];
  for (let i in queries) {
    let word = queries[i],
      matchCount = 0;
    for (let j = 0; j < word.length; j++) {
      if (word[j] === pattern[matchCount]) {
        matchCount++;
      }
    }

    if (matchCount === pattern.length) {
      booleanArr.push(true)
    } else {
      booleanArr.push(false)
    }
  }
  return booleanArr;
}

let queries = ["FooBar", "FooBarTest", "FootBall", "FrameBuffer", "ForceFeedBack"],
  pattern = "FB";
console.log(camelMatch(queries, pattern))