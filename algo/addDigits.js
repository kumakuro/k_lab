var addDigits = function (num) {
  while (num > 9) {
    num = forAdd(num)
  }
  return num;
};

function forAdd(num) {
  let numArr = num.toString().split('');
  let sum = 0;
  for (let i in numArr) {
    sum += numArr[i] * 1
  }
  return sum;
}

console.log(addDigits(38))