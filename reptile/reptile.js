const https = require('https');
const cheerio = require('cheerio');
const fs = require('fs');

let url = 'https://movie.douban.com/chart'
https.get(url, function (res) {
  let chunks = [],
    size = 0;

  res.on('data', function (chunk) {
    chunks.push(chunk);
    size += chunk.length;
  });

  res.on('end', function () {
    let data = Buffer.concat(chunks, size);
    let html = data.toString();

    const $ = cheerio.load(html);
    let rankList = []
    $('.article').find('table').each(i => {
      let movieObj = {
        link: $('table').eq(i).find('.nbg').attr('href'),
        title: $('table').eq(i).find('.nbg').attr('title'),
        img: $('table').eq(i).find('img').attr('src')
      }
      rankList.push(movieObj)
    })

    // 写入文件
    fs.writeFile('./jobs.json', JSON.stringify(rankList), { 'flag': 'a' }, function (err) {
      if (err) throw err;
      console.log('写入成功');
    });
  })
})