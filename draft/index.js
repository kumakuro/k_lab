let arr = [1, 2, 3, 4, 5]
arr.splice(1, 2)
console.log(arr)


// let str = 'sdkjah{\ndasjd';
// reg = /(\{)(\\n)/g;
// console.log(str.replace(reg, "$2 $1"))
// console.log(str.replace(/\n/g, '#'));
// console.log(str.replace(/\#/g, '\n'));



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