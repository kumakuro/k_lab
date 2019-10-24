let arr = [];
function getRandom(num) {
  for (let i = 0; i < num; i++) {
    arr.push(parseInt(Math.random() * 120))
  }
  return arr;
}
// let testArr = getRandom(200);
let testArr = [16, 14];
console.log(testArr)
var numFriendRequests = function (ages) {
  let count = 0;
  for (let A in ages) {
    for (let B in ages) {
      if (A !== B && ages[A] >= 1 && ages[A] <= 120) {
        if (ages[B] <= 0.5 * ages[A] + 7 || ages[B] > ages[A] || (ages[B] > 100 && ages[A] < 100)) {
          // console.log(A, '->', ages[A], ',', B, '->', ages[B], ',result->no')
        } else {
          // console.log(A, '->', ages[A], ',', B, '->', ages[B], ',result->yes')
          count++;
        }
      }
    }
  }
  return count;
};

let prevTime = (new Date()).getTime();
console.log(arr.length, 'numFriendRequests --- > ', numFriendRequests(testArr))
let nextTime = (new Date()).getTime();
console.log('1. ---> ', prevTime);
console.log('2. ---> ', nextTime);
console.log('3. ---> ', nextTime - prevTime);