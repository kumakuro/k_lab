// var hammingDistance = function(x, y) {

// };

function dec2bin(number) {
  let binArr = [];

  return binArr
}

console.log(dec2bin(10))



// var camelMatch = function (queries, pattern) {
//   let boolArr = [],
//     patternArr = [],
//     patternIdx = 0,
//     aIdx = 'a'.charCodeAt();

//   for (let i = 0; i < pattern.length; i++) {
//     let code = pattern[i].charCodeAt()
//     if (code < aIdx && i !== 0) {
//       patternArr.push(pattern.substring(patternIdx, i))
//       patternIdx = i;
//     }
//     if (i + 1 === pattern.length) {
//       patternArr.push(pattern.substring(patternIdx, pattern.length))
//     }
//   }

//   for (let i in queries) {
//     let word = queries[i],
//       idxArr = [],
//       count = 0;

//     for (let k = 0; k < word.length; k++) {
//       if (word[k].charCodeAt() < aIdx) {
//         count++;
//       }
//     }
//     for (let j in patternArr) {
//       idxArr.push(word.indexOf(patternArr[j]))
//     }
//     if (count === patternArr.length) {
//       if (idxArr.indexOf(-1) > -1) {
//         boolArr.push(false);
//       } else {
//         boolArr.push(true);
//       }
//     } else {
//       boolArr.push(false);
//     }
//   }
//   return boolArr;
// };

// let queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"],
//   pattern = "FoBaT";
// console.log(camelMatch(queries, pattern))




// var uniqueMorseRepresentations = function (words) {
//   let mosiArr = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."],
//     wordSet = new Set(),  //wordSet.add()
//     aIdx = 'a'.charCodeAt();

//   for (let i in words) {
//     let w = words[i],
//       wArr = w.split('');
//     for (let j in wArr) {
//       let idx = wArr[j].charCodeAt() - aIdx;
//       wArr[j] = mosiArr[idx];
//     }
//     wordSet.add(wArr.join(''))
//   }

//   return wordSet.size;
// };

// let wordArr = ["gin", "zen", "gig", "msg"]
// console.log(uniqueMorseRepresentations(wordArr))




// var toLowerCase = function (str) {
//   let upStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
//     lowerStr = 'abcdefghijklmnopqrstuvwxyz',
//     strArr = str.split('');

//   for (let i in strArr) {
//     let idx = upStr.indexOf(strArr[i])
//     if (idx > -1) {
//       strArr[i] = lowerStr[idx]
//     }
//   }

//   return strArr.join('')
// };

// console.log(toLowerCase('DjhsIDHknsD'))


// var removeOuterParentheses = function (S) {
//   let deleteArr = [],
//     sArr = S.split(''),
//     count = 0;

//   for (let i = 0; i < sArr.length; i++) {
//     if (sArr[i] === '(') {
//       count++;
//     } else {
//       count--;
//     }

//     if (sArr[i] === '(') {
//       if (count === 1) {
//         deleteArr.push(i)
//       }
//     }
//     if (sArr[i] === ')') {
//       if (count === 0) {
//         deleteArr.push(i)
//       }
//     }
//   }
//   deleteArr.reverse()
//   for (let j of deleteArr) {
//     sArr.splice(j, 1)
//   }

//   return sArr.join('')
// };

// let str = "(()(()))()"
// console.log('answer --- > ', removeOuterParentheses(str))




// var isPowerOfTwo = function (n) {
//   let flag = true, result = 0, prev = 0;
//   for (let i = 0; flag; i++) {
//     if (i === 0) {
//       result = 1;
//     }
//     if (i === 1) {
//       result = 2;
//     }
//     if (i > 1) {
//       result = result * 2;
//     }
//     if (result > n) {
//       flag = false
//     }
//     if (result === n) {
//       break
//     }
//   }
// };