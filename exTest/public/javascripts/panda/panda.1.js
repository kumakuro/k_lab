
const screenWidth = 1024;
const screenHeight = 768;
const loadingWidth = 360;
const bgRatio = 0.5;
const pandaRatio = 0.35;
const normalTextArr = [
  {
    text: 'Hi!',
    fontSize: 24
  },
  {
    text: 'Welcome back!',
    fontSize: 24
  },
  {
    text: 'Happy to see you.',
    fontSize: 24
  },
  {
    text: 'I love you.',
    fontSize: 24
  }
]
const hungerTextArr = [
  {
    text: 'I am hungry.',
    fontSize: 24
  }, {
    text: 'I want something to eat.',
    fontSize: 20
  }, {
    text: 'Can I have some meat?',
    fontSize: 22
  }, {
    text: 'I am starving.',
    fontSize: 24
  }, {
    text: 'My stomach is growling.',
    fontSize: 18
  }
]
const timeTextArr = [
  {
    text: 'Good morning!',


    fontSize: 24
  },
  {
    text: 'Good afternoon!',


    fontSize: 24
  },
  {
    text: 'Good evening!',


    fontSize: 24
  }
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


var bgTween, textTween;


function preload() {

  this.stage.backgroundColor = "#1A91E0";

  // game.load.image('loadingBg', '/javascripts/panda/image/bg1.png')
  // var loadingBg = game.add.sprite(0, 0, 'loadingBg');

  var loadingText = game.add.text(game.world.centerX, game.world.centerY - 50, '加载中...0%', { font: "18px Arial", fill: "#333333", align: "center" });
  loadingText.anchor.set(0.5);

  var shadow = game.add.graphics();
  shadow.beginFill(0x000000, 0.2);
  shadow.drawRect(330, screenHeight / 2 - 25, loadingWidth, 25);

  var bar = game.add.graphics();
  game.load.onFileComplete.add(progress => {
    console.log('progress->', progress)
    loadingText.setText('加载中..' + progress + '%')
    bar.beginFill(0xFEAE24, 1);
    bar.drawRect(330, screenHeight / 2 - 25, loadingWidth * (progress / 100), 25);
  }, game);

  game.add.plugin(PhaserSpine.SpinePlugin);
  game.load.spine('panda1', '/javascripts/panda/shengdanyouniance.json');
  game.load.spine('panda2', '/javascripts/panda/shengdanyouniance.json');
  game.load.spine('panda3', '/javascripts/panda/shengdanyouniance.json');

  game.load.image('bg1', '/javascripts/panda/image/bg1.png')
  game.load.image('bg0', '/javascripts/panda/image/bg0.png')
  game.load.image('bubble', '/javascripts/panda/image/bubble.png')

}

function create() {
  // 背景图
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

  // 角色
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
    pandaPlayer.scale.x = pandaRatio;
  }
  if (targetX < parseInt(pandaPlayer.x)) {
    pandaPlayer.scale.x = -1 * pandaRatio;
  }
  clearBubble();
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
  if (roleClick) return;
  roleClick = true;
  setTimeout(() => {
    generateNewBubble();
  }, 500)
}

function clearBubble() {
  if (bubbleBg) {
    bubbleBg.destroy();
    bubbleText.destroy();
    bubbleBg = null;
    bubbleText = null;
  }
  roleClick = false;
}

function changeBubleText() {
  var t = generateRandomText()
  bubbleText.setText(t.text)
  bubbleText.x = Math.floor(bubbleBg.x + bubbleBg.width / 2) + (pandaPlayer.x > screenWidth / 2 ? -10 : 10);
  bubbleText.y = Math.floor(bubbleBg.y + bubbleBg.height / 2) + 10;
}

function generateNewBubble() {
  var t = generateRandomText()
  var pWidth = parseInt(Math.abs(pandaPlayer.width))
  var bubbleX = pandaPlayer.x > screenWidth / 2
    ? pandaPlayer.x - pWidth / 2
    : pandaPlayer.x + pWidth / 2;

  bubbleBg = game.add.sprite(bubbleX, pandaPlayer.y - pandaPlayer.height, 'bubble');
  bubbleBg.scale.x = pandaPlayer.x > screenWidth / 2 ? -1 : 1;
  bubbleBg.alpha = 0;
  var style = { font: t.fontSize + "px CenturyGothic-Bold", fill: "#FEAE24", wordWrap: true, wordWrapWidth: Math.abs(bubbleBg.width), align: "center" }
  bubbleText = game.add.text(0, 0, t.text, style)
  bubbleText.x = Math.floor(bubbleBg.x + bubbleBg.width / 2) + (pandaPlayer.x > screenWidth / 2 ? -10 : 10);
  bubbleText.y = Math.floor(bubbleBg.y + bubbleBg.height / 2) + 10;
  bubbleText.anchor.set(0.5);
  bubbleText.alpha = 0;

  bgTween = game.add.tween(bubbleBg).to({ alpha: 1, y: bubbleBg.y - 50 }, 300, "Linear", true);
  textTween = game.add.tween(bubbleText).to({ alpha: 1, y: bubbleText.y - 50 }, 300, "Linear", true);
  bgTween.onComplete.addOnce(tweenNext, this);
}

function tweenNext() {

  textTween = game.add.tween(bubbleText).to({ alpha: 0, y: bubbleText.y + 50 }, 300, "Linear", true, 2700);
  bgTween = game.add.tween(bubbleBg).to({ alpha: 0, y: bubbleBg.y + 50 }, 300, "Linear", true, 2700);

  bgTween.onComplete.add(bgTweenEnd, this);
}
function bgTweenEnd() {
  clearBubble()
}

function initPanda({ level = 1, isHunger = 0, cloth = 0, bg = 0 }) {
  console.log('initPanda->', level, isHunger, cloth, bg)

  levelIn = level
  isHungryIn = isHunger
  clothIn = cloth
  bgIn = bg

  setTimeout(() => {
    game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, 'phaserSet',
      {
        preload: preload
        // preload: preload,
        // create: create,
        // update: update
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