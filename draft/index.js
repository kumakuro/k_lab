let strArr = [
  "race a car",
  "A man, a plan, a canal: Panama",
  ".,"];

//false
//true
//true

var isPalindrome = function (s) {
  if (s.length > 0) {
    let { s1: str1, s2: str2 } = reverse(s);
    if (str2 === str1) {
      return true;
    } else {
      let pattern2 = /\w+/g;
      let temp = str1.match(pattern2, '');
      if (temp) {
        let { s1: str3, s2: str4 } = reverse(temp.join(''));
        if (str3 === str4) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  } else {
    return true;
  }
};
function reverse(ins) {
  let str = ins, s1 = '', s2 = '';
  for (let i = 0; i < str.length; i++) {
    s1 += str[i].toLowerCase();
    s2 += str[str.length - 1 - i].toLowerCase();
  }
  return { s1, s2 };
}

for (let i in strArr) {
  console.log('isPalindrome--->', isPalindrome(strArr[i]))
}




// var searchMatrix = function (matrix, target) {
//   let booleanTag = false;
//   for (let i = 0; i < matrix.length; i++) {
//     let itm = matrix[i];
//     for (let j = 0; j < itm.length; j++) {
//       if (itm[j] === target) {
//         booleanTag = true;
//       }
//       if (itm[j] > target) {
//         break;
//       }
//     }
//   }
//   return boo
// };
// let matrix = [
//   [1, 4, 7, 11, 15],
//   [2, 5, 8, 12, 19],
//   [3, 6, 9, 16, 22],
//   [10, 13, 14, 17, 24],
//   [18, 21, 23, 26, 30]
// ]
// console.log(searchMatrix(matrix, 5))




// var majorityElement = function (nums) {
//   nums.sort();
//   let arr = [], nval = nums[0], nvalCount = 0;
//   for (let i in nums) {

//     if (nums[i] === nval) {
//       nvalCount++;
//       if (i * 1 === nums.length - 1) {
//         if (nvalCount > parseInt(nums.length / 2)) {
//           arr.push(nval)
//         }
//       }
//     }
//     if (nums[i] !== nval) {
//       if (nvalCount > parseInt(nums.length / 2)) {
//         arr.push(nval)
//       }
//       nval = nums[i];
//       nvalCount = 1;
//     }
//   }
//   return arr.length > 1 ? arr : arr[0]
// };
// let arr = [1, 1, 1, 2, 2, 2, 2];
// console.log(majorityElement(arr))


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