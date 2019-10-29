
// var _ = require('lodash');

$("#change").click(() => {
  handleData()
})

const handleData = () => {
  let leftStr = $("#left").val(),
    rightJson = JSON.parse(leftStr),
    pageArr = rightJson['pages'],
    markArr = [];

  for (let i in pageArr) {
    let strArr = pageArr[i].str,
      temp = [];
    for (let j in strArr) {
      let sentence = strArr[j].replace(/\\n/g, ' '),
        correctWord = pageArr[i]["correct-word"],
        arr = sentence.match(/(\*)+(\w+\'*\s*)+(\*)+/g, '$1');

      arr.forEach(itm => {
        let mresult = itm.replace(/\*/g, '');
        temp.push(_.trim(mresult))
        // if (mresult !== correctWord) {
        //   temp.push(_.trim(mresult))
        // }
      });
    }
    pageArr[i].boldword = temp;
    markArr.push(temp);
  }

  $(".boldword").val(JSON.stringify(markArr))
  $("#right").val(JSON.stringify(rightJson))
}