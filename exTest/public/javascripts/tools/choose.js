$(document).ready(function () {
  $(document).on('click', '#handle', function () {
    let contentArr = $('#input').val().replace(/",(\s)+"/g, ' ').replace(/\\n/g, ' ').split(' '),
      contentHtml = '',
      markStr = '';

    for (let i in contentArr) {
      let fragment = '';
      if (contentArr[i].indexOf('{{') > -1 || contentArr[i].indexOf('}}') > -1) {
        fragment = `<div class="item active">${contentArr[i]}</div>`
        markStr += '[' + i + '],'
      } else {
        fragment = `<div class="item">${contentArr[i]}</div>`
      }

      contentHtml += fragment;
    }

    $(document).find('.box').append(contentHtml);
    $(document).find('.result').html(markStr);
  })

  $('.box').on('click', 'item', function () {

  })
})