$(document).ready(function () {

  let str = "  Wow! It wasn't just a *crack* in the rock. It was a secret *entrance to* an *ancient*\n*room*!";

  $(document).on('click', '#handle', function () {
    let inputStr = $('#input').val();
    if (inputStr.length > 0) {
      // let contentArr = inputStr.replace(/",(\s)+"/g, ' ').replace(/\\n/g, ' ').split(' '),
      let contentArr = inputStr.replace(/\\n/g, ' ').split(' '),
        contentHtml = '',
        markArr = [];

      for (let i in contentArr) {
        let fragment = '';
        if (contentArr[i].indexOf('*') > -1) {
          fragment = `<div class="item active">${contentArr[i]}</div>`;
          markArr.push(contentArr[i])
        } else {
          fragment = `<div class="item">${contentArr[i]}</div>`
        }
        contentHtml += fragment;
      }
      $(document).find('.box').html(contentHtml + `<div class="clear"></div>`);
      wordsHandle(markArr);
    }

  })

  $('.box').on('click', 'item', function () {

  })
})

function wordsHandle(inputArr) {
  let wordArr = [],
    reg1 = /\*(\w+)\*/g,
    reg2 = /\*/g,
    backArr = [],
    backStr = '';

  for (let i in inputArr) {
    let temp = inputArr[i].match(reg1, '$1');
    if (temp) {
      if (wordArr.length > 0) {
        backArr.push(wordArr.join(' '));
        wordArr = [];
      }
      backArr.push(temp[0])
    } else {
      if (inputArr[i].indexOf('*') === 0 && wordArr.length > 0) {
        backArr.push(wordArr.join(' '));
        wordArr = [];
      }
      wordArr.push(inputArr[i])
    }
  }

  for (let i in backArr) {
    backStr += '"' + backArr[i].replace(reg2, '') + '"' + (i * 1 === backArr.length - 1 ? '' : ',');
  }
  $(document).find('.result').val(backStr);
}