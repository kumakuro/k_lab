var isPalindrome = function (x) {
  let arr = x.toString().split(''),
    str = ''

  for (let i = arr.length - 1; i >= 0; i--) {
    str += arr[i]
  }
  if (x.toString() === str) {
    return true
  } else {
    return false
  }

}

console.log(isPalindrome(121))