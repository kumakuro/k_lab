var majorityElement = function (nums) {
  let arr = [], num, numCount = 0;
  nums.sort();

  for (let i in nums) {

  }
};



// console.log(10^4)
// let arr = [[1,1,0],[1,0,1],[0,0,0]]

// var hammingDistance = function (x, y) {
//   let count = 0;

//   while (x !== 0 || y !== 0) {
//     if ((x & 1) != (y & 1)) {
//       count++
//     }

//     x >>= 1
//     y >>= 1

//     console.log(x, y)
//   }

//   return count;
// };
// console.log(hammingDistance(2, 4))


// let arr = [];
// function getRandom(num) {
//   for (let i = 0; i < num; i++) {
//     arr.push(parseInt(Math.random() * 120))
//   }
//   return arr;
// }
// // let testArr = getRandom(200);
// let testArr = [16, 14];
// console.log(testArr)
// var numFriendRequests = function (ages) {
//   let count = 0;
//   for (let A in ages) {
//     for (let B in ages) {
//       if (A !== B && ages[A] >= 1 && ages[A] <= 120) {
//         if (ages[B] <= 0.5 * ages[A] + 7 || ages[B] > ages[A] || (ages[B] > 100 && ages[A] < 100)) {
//           // console.log(A, '->', ages[A], ',', B, '->', ages[B], ',result->no')
//         } else {
//           // console.log(A, '->', ages[A], ',', B, '->', ages[B], ',result->yes')
//           count++;
//         }
//       }
//     }
//   }
//   return count;
// };

// let prevTime = (new Date()).getTime();
// console.log(arr.length, 'numFriendRequests --- > ', numFriendRequests(testArr))
// let nextTime = (new Date()).getTime();
// console.log('1. ---> ', prevTime);
// console.log('2. ---> ', nextTime);
// console.log('3. ---> ', nextTime - prevTime);





// var singleNumber = function (nums) {
//   let num;
//   for (let i = 0; i < nums.length; i++) {
//     let temp = nums[i];
//     for (let j = 0; i < j < nums.length; j++) {
//       if (nums[i] === nums[j]) {
//         continue;
//       } else {
//         num = nums[i]
//       }
//     }
//   }
//   return num;
// };
// let arr = [4, 1, 2, 1, 2]
// console.log(singleNumber(arr))



// var camelMatch = function (queries, pattern) {
//   let booleanArr = [];
//   for (let i in queries) {
//     let word = queries[i],
//       matchCount = 0;
//     for (let j = 0; j < word.length; j++) {
//       if (word[j] === pattern[matchCount]) {
//         matchCount++;
//       }
//     }

//     if (matchCount === pattern.length) {
//       booleanArr.push(true)
//     } else {
//       booleanArr.push(false)
//     }
//   }
//   return booleanArr;
// }

// let queries = ["FooBar", "FooBarTest", "FootBall", "FrameBuffer", "ForceFeedBack"],
//   pattern = "FB";
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