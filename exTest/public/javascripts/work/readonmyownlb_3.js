
$("#transfer").click(function () { handleData() })

function handleData() {
  var before = JSON.parse($('#before').val())

  // before.title.position.y
  var after = {
    "cover": {
      "image": before.cover
    },
    "titles": [],
    "introSound": {
      "sound": before.introSound || ""
    },
    "lightColor": "#FC6D19",
    "textPageFont": {
      "font": "Century Gothic",
      "fill": "#000",
      "fontSize": 10
    }
  }

  if (before.title) {
    after.titles.push(squeeze(before.title))
  }
  if (before.writtenBy) {
    after.titles.push(squeeze(before.writtenBy))
  }
  if (before.illustratedBy) {
    after.titles.push(squeeze(before.illustratedBy))
  }


  let beforePagesArr = before.pages,
    afterPagesArr = [];

  for (let i in beforePagesArr) {
    afterPagesArr[i] = {
      "subtitle": [],
      "positionArr": [],
      "image": beforePagesArr[i].pic || "",
      "picX": 0,
      "picY": 0,
      "font": {
        "font": "Century Gothic",
        "fill": "#000",
        "fontSize": 20
      },
      "wordCanClickIndex": []
    }

    let dialogArr = beforePagesArr[i].info;
    for (let j in dialogArr) {
      afterPagesArr[i].subtitle.push(dialogArr[j].subtitle);
      afterPagesArr[i].positionArr.push(dialogArr[j].position);
    }



    // let titleArr = beforePagesArr[i].subtitle.split(' ')
    // for (let j in titleArr) {
    //   if (titleArr[j].indexOf('{{') > -1) {
    //     let a = [];
    //     a.push(j * 1);
    //     afterPagesArr[i].wordCanClickIndex.push(a);
    //   }
    // }
  }

  let beforeDictionaryArr = before.dictionary,
    afterDictionaryArr = {};

  for (let i in beforeDictionaryArr) {
    afterDictionaryArr[i] = {
      "hasComeFrom": i !== beforeDictionaryArr[i].word ? true : false,
      "sound": beforeDictionaryArr[i].sound || "",
      "image": beforeDictionaryArr[i].pic || "",
      "scale": 0.9,
      "color": "#000",
      "explain": beforeDictionaryArr[i].explain || "",
      "word": beforeDictionaryArr[i].word || "",
      "type": beforeDictionaryArr[i].type || "",
      "typeSound": {
        "sound": beforeDictionaryArr[i].typeSound || ""
      },
      "explainSound": {
        "sound": beforeDictionaryArr[i].explainSound || ""
      }
    }
  }

  after.pages = afterPagesArr
  after.dictionary = afterDictionaryArr

  $('body').find('#after').val(JSON.stringify(after))
}

function squeeze(itm) {
  let obj = {
    "images": [
      itm.pic1,
      itm.pic2
    ],
    "sound": itm.sound,
    "x": itm.position.x,
    "y": itm.position.y,
    "scale": 1.2
  }
  return obj;
}
