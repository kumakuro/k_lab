var countCharacters = function (words, chars) {
  let wStr = '',
    charArr = chars.split('');
  for (let i in words) {
    let wordArr = words[i].split(''),
      charIdxArr = [];
    for (let j in wordArr) {
      let flag = false;
      for (let k in charArr) {
        if (wordArr[j] === charArr[k] && charIdxArr.indexOf(k) === -1) {
          charIdxArr.push(k);
          flag = true;
          break;
        }
      }
      if (!flag) continue;
    }
  }
  return wStr.length
};

let words = ["cat", "bt", "hat", "tree"], chars = "atach"

console.log(countCharacters(words, chars))
