let str = [
  " The plot describes **what *will *happen** to these characters. In the\nbeginning, they **have* *a* *problem** that needs to be solved. The\n**main *characters** spend **most *of *the *play** trying to solve the\nproblem.",
  " Now that you know how a script is written, **you're *ready** to read\nmy play! It's called The Case of Missing Manny, **It *all *happens** on\na movie set, and it's full of **movie *stars** and clues. Get ready for\n*lights*, *camera*, *and* *action*!"
]

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
        arr = sentence.match(/(\*)+(\w+\'*\s*\**)+(\*)+/g, '$1')

      arr.forEach(itm => {
        let mresult = itm.replace(/\*/g, '');
        temp.push(_.trim(mresult))
      });
    }
    pageArr[i].boldword = temp;
    markArr.push(temp);
  }

  $(".boldword").val(JSON.stringify(markArr))
  $("#right").val(JSON.stringify(rightJson))
}