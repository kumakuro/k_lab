let strArr = [
  ["h", "e", "l", "l", "o"],
  ["H", "a", "n", "n", "a", "h"]
]


var reverseString = function (s) {
  let len = s.length;
  for (let i = 0; i < Math.floor(len / 2); i++) {
    let temp = s[i];
    s[i] = s[len - i - 1];
    s[len - i - 1] = temp;
  }
};


let s = ["h", "e", "l", "l", "o"]
reverseString(s)

console.log(s)

