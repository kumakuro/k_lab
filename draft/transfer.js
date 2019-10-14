// import _ from 'lodash'


$("#transfer").click(function () { handleData() })

function handleData() {
  var before = JSON.parse($('#before').val())
  var after = {
    "cover": {
      "image": before.cover
    },
    "titles": [
      {
        "images": [
          before.title.pic1,
          before.title.pic2
        ],
        "sound": before.title.sound,
        "x": before.title.position.x,
        "y": before.title.position.y,
        "scale": 1.2
      },
      {
        "images": [
          before.writtenBy.pic1,
          before.writtenBy.pic2
        ],
        "sound": before.writtenBy.sound,
        "x": before.writtenBy.position.x,
        "y": before.writtenBy.position.y,
        "scale": 1.2
      },
      {
        "images": [
          before.illustratedBy.pic1,
          before.illustratedBy.pic2
        ],
        "sound": before.illustratedBy.sound,
        "x": before.illustratedBy.position.x,
        "y": before.illustratedBy.position.y,
        "scale": 1.2
      },
    ],
    "introSound": {
      "sound": before.introSound
    },
    "lightColor": "#FC6D19",
    "textPageFont": {
      "font": "Century Gothic",
      "fill": "#000",
      "fontSize": 10
    }
  }

  let beforePagesArr = before.pages,
    afterPagesArr = [];

  for (let i in beforePagesArr) {
    afterPagesArr[i] = {
      "subtitle": [],
      "positionArr": [],
      "image": beforePagesArr[i].pic,
      "picX": 0,
      "picY": 0,
      "font": {
        "font": "Century Gothic",
        "fill": "#000",
        "fontSize": 24
      },
      "wordCanClickIndex": []
    }

    afterPagesArr[i].subtitle.push(beforePagesArr[i].subtitle);
    afterPagesArr[i].positionArr.push(beforePagesArr[i].position);

    console.log('beforePagesArr[i].subtitle --- > ',beforePagesArr[i].subtitle)
    let titleArr = beforePagesArr[i].subtitle.split(' ')
    for (let j in titleArr) {
      if (titleArr[j].indexOf('{{') > -1) {
        let a = [];
        a.push(j*1);
        afterPagesArr[i].wordCanClickIndex.push(a);
        console.log('j --- > ',j)
      }
    }
  }

  let beforeDictionaryArr = before.dictionary,
    afterDictionaryArr = {};

  for (let i in beforeDictionaryArr) {
    afterDictionaryArr[i] = {
      "hasComeFrom": i !== beforeDictionaryArr[i].word ? true : false,
      "sound": beforeDictionaryArr[i].sound,
      "image": beforeDictionaryArr[i].pic,
      "scale": 0.9,
      "color": "#000",
      "explain": beforeDictionaryArr[i].explain,
      "word": beforeDictionaryArr[i].word,
      "type": beforeDictionaryArr[i].type,
      "typeSound": {
        "sound": beforeDictionaryArr[i].typeSound
      },
      "explainSound": {
        "sound": beforeDictionaryArr[i].explainSound
      }
    }
  }

  after.pages = afterPagesArr
  after.dictionary = afterDictionaryArr

  $('body').find('#after').val(JSON.stringify(after))
}
