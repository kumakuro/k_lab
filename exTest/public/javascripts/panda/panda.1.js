
const screenWidth = 1024;
const screenHeight = 768;
const bgRatio = 0.5;
const pandaRatio = 0.35;
const normalTextArr = [
  'Hi!',
  'Welcome back!',
  'Happy to see you.',
  'I love you.'
]
const hungerTextArr = [
  'I am hungry.',
  'I want something to eat.',
  'Can I have some meat?',
  'I am starving.',
  'My stomach is growling.'
]
const timeTextArr = [
  'Good morning!',
  'Good afternoon!',
  'Good evening!'
]

var pandaPlayer, game, bubbleBg, bubbleText, transPanel;
var targetX = screenWidth / 2;

var levelNum = 1, levelIn; //1-幼年,2-中年,3-老年
var bgArr = [], bgNum = 0, bgIn; // 0-竹林，1-圣诞
var clothArr = ['1', '2'], clothIn; // 1-没衣服，2-圣诞
var clothClickFlagArr = [null, null]; // 与衣服一一对应，换一套新衣服时，重新绑定点击事件
var stateArr = ['hunger', 'walk', 'idle'], stateNum = 2, stateIn;  // 0-饥饿,1-饱腹,2-无聊
var isHungry = 0, isHungryIn;
var actionTimeout; // 小动作计时器
var roleClick = false;


function preload() {
  game.add.plugin(PhaserSpine.SpinePlugin);
  game.load.spine('panda1', '/javascripts/panda/shengdanyouniance.json');
  game.load.spine('panda2', '/javascripts/panda/shengdanyouniance.json');
  game.load.spine('panda3', '/javascripts/panda/shengdanyouniance.json');

  game.load.image('bg1', '/javascripts/panda/image/bg1.png')
  game.load.image('bg0', '/javascripts/panda/image/bg0.png')
  game.load.image('bubble', '/javascripts/panda/image/bubble.png')

  var bar = game.add.graphics();
  game.load.onFileComplete.add(progress => {
    bar.beginFill(0xffffff, 1);
    bar.drawRect(0, screenHeight / 2 - 200, screenWidth * (progress / 100), 50);
  }, game);

}

function create() {
  var bg0 = game.add.sprite(0, 0, 'bg0');
  bg0.alpha = 0;
  bg0.scale.x = bgRatio;
  bg0.scale.y = bgRatio;
  bg0.num = 0;
  bg0.events.onInputDown.add(() => {
    defineBgSpriteClick()
  })
  var bg1 = game.add.sprite(0, 0, 'bg1');
  bg1.alpha = 0;
  bg1.scale.x = bgRatio;
  bg1.scale.y = bgRatio;
  bg1.num = 1;
  bg1.events.onInputDown.add(() => {
    defineBgSpriteClick()
  })
  bgArr.push(bg1)
  bgArr.push(bg0)
  if (bgNum != bgIn) {
    bgNum = bgIn;
  }
  changeBgArr()

  pandaPlayer = game.add.spine(targetX, screenHeight / 2 + 250, 'panda' + levelNum);
  pandaPlayer.scale.x = pandaRatio
  pandaPlayer.scale.y = pandaRatio
  pandaPlayer.setMixByName('walk', 'idle', 0.2);
  pandaPlayer.setMixByName('idle', 'walk', 0.2);

  pandaPlayer.setSkinByName(clothArr[clothIn]);
  pandaPlayer.setToSetupPose();
  bindPandaSkinClick();
  pandaPlayer.setAnimationByName(0, stateArr[stateNum], true);
  if (stateArr[stateNum] == 'idle') {
    actionsRandom()
  } else if (actionTimeout) {
    clearTimeout(actionTimeout)
  }

  // // 透明遮罩
  // transPanel = game.add.graphics();
  // transPanel.beginFill(0xffffff, 0);
  // transPanel.drawRect(0, 0, screenWidth, screenHeight);
  // transPanel.inputEnabled = false;
}

function update() {
  if (isHungryIn != isHungry) isHungry = isHungryIn
  if (Math.abs(targetX - parseInt(pandaPlayer.x)) < 60) {
    stateIn = isHungry ? 0 : 2;
  } else {
    stateIn = 1;
  }

  // 状态切换
  if (stateIn != stateNum) {
    stateNum = stateIn;
    pandaPlayer.setAnimationByName(0, stateArr[stateNum], true);
    if (stateArr[stateNum] == 'idle') {
      actionsRandom()
    } else if (actionTimeout) {
      clearTimeout(actionTimeout)
    }
  }

  // 左右走的判断
  if (targetX - 50 > parseInt(pandaPlayer.x)) {
    pandaPlayer.x += isHungry ? 8 * bgRatio * 0.2 : 8 * bgRatio;
  }
  if (targetX < parseInt(pandaPlayer.x) - 50) {
    pandaPlayer.x -= isHungry ? 8 * bgRatio * 0.2 : 8 * bgRatio;
  }

  // 换背景
  if (bgNum != bgIn) {
    bgNum = bgIn;
    changeBgArr()
  }
  // 换衣服
  if (clothClickFlagArr[clothIn] == false) {
    bindPandaSkinClick();
  }
}

// 默认动作：向左走两步，向右走两步
function actionsRandom() {
  console.log('execute actionsRandom')
  actionTimeout = setTimeout(() => {
    console.log('timeout')
  }, 5000)
}

function defineBgSpriteClick() {
  targetX = parseInt(game.input.activePointer.position.x);
  if (targetX > parseInt(pandaPlayer.x)) {
    pandaPlayer.scale.x = pandaRatio
  }
  if (targetX < parseInt(pandaPlayer.x)) {
    pandaPlayer.scale.x = -1 * pandaRatio
  }
  pandaPlayer.setToSetupPose();
}

function changeBgArr() {
  bgArr.map(itm => {
    if (itm.num == bgNum) {
      itm.alpha = 1;
      itm.inputEnabled = true;
    } else {
      itm.alpha = 0;
      itm.inputEnabled = false;
    }
  })
}

function bindPandaSkinClick() {
  clothClickFlagArr[clothIn] = true;
  for (var i in pandaPlayer.children) {
    var itm = pandaPlayer.children[i]
    if (itm.children.length > 0) {
      itm.setAll('inputEnabled', true)
      itm.callAll('events.onInputDown.add', 'events.onInputDown', clickPanda)
    } else {
      clothClickFlagArr[clothIn] = false;
    }
  }
}

function generateRandomText() {
  var time = new Date();
  var hours = time.getHours();
  var textArr = [];
  var text = '';

  if (stateNum == '1') {
    targetX = parseInt(pandaPlayer.x);
    stateNum = isHungry ? '0' : '2';
    pandaPlayer.setAnimationByName(0, stateArr[stateNum], true);
  }

  if (isHungry) {
    textArr = hungerTextArr
  } else {
    if (hours <= 11 && hours >= 6) {
      textArr = normalTextArr.concat(timeTextArr[0])
    }
    if (hours <= 16 && hours >= 12) {
      textArr = normalTextArr.concat(timeTextArr[1])
    }
    if (hours <= 22 && hours >= 17) {
      textArr = normalTextArr.concat(timeTextArr[2])
    }
  }
  var len = textArr.length
  text = textArr[parseInt(Math.random() * len)]
  return text;
}

function clickPanda() {
  if(roleClick) return;
  if (bubbleBg) {
    clearBubble()
  } else {
    setTimeout(() => {
      generateNewBubble();
    }, 500)
  }
}

function clearBubble() {
  if (bubbleBg) {
    bubbleBg.destroy();
    bubbleText.destroy();
    bubbleBg = null;
    bubbleText = null;
  }
}

function generateNewBubble() {

  var t = generateRandomText()
  var bubbleX = pandaPlayer.x > screenWidth / 2
    ? pandaPlayer.x - pandaPlayer.width
    : pandaPlayer.x + pandaPlayer.width;

  bubbleBg = game.add.sprite(bubbleX, pandaPlayer.y - pandaPlayer.height, 'bubble');
  bubbleBg.alpha = 0;
  var style = { font: "32px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: bubbleBg.width, align: "center" }
  bubbleText = game.add.text(bubbleBg.x, bubbleBg.y, t, style);
  bubbleText.alpha = 0;

  game.add.tween(bubbleBg).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
  game.add.tween(bubbleText).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);

  setTimeout(() => {
    clearBubble()
  }, 3000)
}

function initPanda({ level = 1, isHungry = 0, cloth = 0, bg = 0 }) {
  console.log('initPanda->', level, isHungry, cloth, bg)

  levelIn = level
  isHungryIn = isHungry
  clothIn = cloth
  bgIn = bg

  setTimeout(() => {
    game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, 'phaserSet',
      {
        preload: preload,
        create: create,
        update: update
      }
    );
  }, 100)


}

function changeCloth(num) {
  clothIn = clothArr.indexOf(num);
  pandaPlayer.setSkinByName(num);
  pandaPlayer.setToSetupPose();
  setTimeout(() => {
    bindPandaSkinClick();
  }, 300)

}

function changeBg(num) {
  bgIn = num;
}

export {
  initPanda,
  changeCloth,
  changeBg
}