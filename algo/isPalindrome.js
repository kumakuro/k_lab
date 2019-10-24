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
