
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

var game, roleWalk, roleBreath, roleHunger, roleArr = []; // 新增三种动作的角色
var bindBodyArr = [false, false, false];// 给对应的状态绑定click事件
var bubbleBg, bubbleText, bubbleClick = false; // 气泡背景图，气泡文字
var targetX = screenWidth / 2; // 角色移动位置
var bgArr = [], bgNum = 0, bgIn = 0; // 0-竹林，1-圣诞
var clothArr = ['1', '2', '3', '4', '5'], clothIn = 0; // 1-没衣服，2-圣诞
var state = 1, stateIn = null; // 0-walk;1-breath;2-hunger;
var isHunger = 0, isHungerIn = null;
var breathCount = 0; //  呼吸达到1000时，触发左右两步晃

var bgTween, textTween; // 气泡的背景和文字

function preload() {
  /**
   * Todo: 用jq和dom节点做进度条
   */
  game.load.image('bg1', '/javascripts/panda/image/bg1.png')
  game.load.image('bg0', '/javascripts/panda/image/bg0.png')
  game.load.image('bubble', '/javascripts/panda/image/bubble.png')

  game.add.plugin(PhaserSpine.SpinePlugin);
  game.load.spine('roleWalk', '/javascripts/panda/yijizoulu.json');
  game.load.spine('roleBreath', '/javascripts/panda/yijihuxi.json');
  game.load.spine('roleHunger', '/javascripts/panda/yijijie.json');


  game.load.spine('roleWalk1', '/javascripts/panda/yijizoulu.1.json');
  game.load.spine('roleBreath1', '/javascripts/panda/yijihuxi.1.json');
  game.load.spine('roleHunger1', '/javascripts/panda/yijijie.1.json');

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

  roleWalk = game.add.spine(targetX, screenHeight / 2 + 250, 'roleWalk');
  roleWalk.scale.x = pandaRatio
  roleWalk.scale.y = pandaRatio
  roleWalk.setSkinByName(clothArr[clothIn]);
  roleWalk.setToSetupPose();
  roleWalk.setAnimationByName(0, 'you', true);
  roleWalk.alpha = 0;

  roleBreath = game.add.spine(targetX, screenHeight / 2 + 250, 'roleBreath');
  roleBreath.scale.x = pandaRatio
  roleBreath.scale.y = pandaRatio
  roleBreath.setSkinByName(clothArr[clothIn]);
  roleBreath.setToSetupPose();
  roleBreath.setAnimationByName(0, 'you', true);
  roleBreath.alpha = 0;

  roleHunger = game.add.spine(targetX, screenHeight / 2 + 250, 'roleHunger');
  roleHunger.scale.x = pandaRatio
  roleHunger.scale.y = pandaRatio
  roleHunger.setSkinByName(clothArr[clothIn]);
  roleHunger.setToSetupPose();
  roleHunger.setAnimationByName(0, 'you', true);
  roleHunger.alpha = 0;

  roleArr.push(roleWalk);
  roleArr.push(roleBreath);
  roleArr.push(roleHunger);

  roleArr[state].alpha = 1;
}

function update() {
  // 切换背景图
  if (bgNum != bgIn) {
    bgNum = bgIn;
    changeBgArr()
  }

  // 行走和固定位置的状态切换
  if (stateIn != null && stateIn != state) {
    state = stateIn;
    roleArr.forEach((itm, idx) => {
      itm.alpha = 0;
      if (idx == state) {
        itm.alpha = 1;
      }
    })
    setRoleSkeletonClick(state)
  }
  // 左走右走及不走的判定
  if (targetX - 100 > parseInt(roleWalk.x)) {
    roleWalk.x += isHunger ? 8 * bgRatio * 0.2 : 8 * bgRatio;
    syncAllRoleX(0, roleWalk.x)
  }
  if (targetX < parseInt(roleWalk.x) - 100) {
    roleWalk.x -= isHunger ? 8 * bgRatio * 0.2 : 8 * bgRatio;
    syncAllRoleX(0, roleWalk.x)
  }
  if (Math.abs(targetX - parseInt(roleWalk.x)) <= 100) {
    stateIn = isHunger == 1 ? 2 : 1;
  }

  // breath状态判定
  if (state == 0) {
    breathCount++;
    if (breathCount == 1000) {
      getBreathActionRandom()
    }
  }

  // 给不同的动作角色绑定click事件
  if (bindBodyArr.indexOf(false) > -1) {
    bindBodyArr.forEach((itm, idx) => {
      if (itm == false) { actionRoleBindClick(idx) }
    })
  }
}

// 呼吸时产生的随机动作
function getBreathActionRandom() {
  breathCount = 0
}

// 同步除指定role外其他的role的x参数
function syncAllRoleX(s, x) {
  roleArr.forEach((itm, idx) => {
    if (idx != s) {
      itm.x = x
    }
  })
}

// 定义背景图精灵的点击事件
function defineBgSpriteClick(num) {
  let tx = num ? num : parseInt(game.input.activePointer.position.x);

  if (tx - 100 > parseInt(roleWalk.x)) {
    roleWalk.scale.x = pandaRatio;
    targetX = tx;
    stateIn = 0;
  }
  if (tx < parseInt(roleWalk.x) - 100) {
    roleWalk.scale.x = -1 * pandaRatio;
    targetX = tx;
    stateIn = 0;
  }

  if (bubbleBg && bubbleText) {
    tweenNext(1)
  }
}

// 切换背景图
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

// 给三个动作角色的skeleton的每个部位绑定click事件
function actionRoleBindClick(idx) {
  bindBodyArr[idx] = true
  let role = roleArr[idx]
  for (var i in role.children) {
    var itm = role.children[i]
    if (itm.children.length > 0) {
      itm.setAll('inputEnabled', role.alpha == 1 ? true : false)
      switch (idx) {
        case 0:
          itm.callAll('events.onInputDown.add', 'events.onInputDown', walkClick)
          break;
        case 1:
          itm.callAll('events.onInputDown.add', 'events.onInputDown', breathClick)
          break;
        case 2:
          itm.callAll('events.onInputDown.add', 'events.onInputDown', hungerClick)
          break;
        default:
          break;
      }
    } else {
      bindBodyArr[idx] = false
    }
  }
}

// 设置 指定角色可以点击
function setRoleSkeletonClick(idx) {
  roleArr.forEach((rtm, rdx) => {
    for (var i in rtm.children) {
      var itm = rtm.children[i]
      if (itm.children.length > 0) {
        itm.setAll('inputEnabled', rdx == idx ? true : false)
      }
    }
  })
}

// walk角色的click
function walkClick() {
  console.log('walk')
  targetX = roleWalk.x;
  setTimeout(() => {
    breathClick()
  }, 300)
  return;
}

// breath角色的click
function breathClick() {
  console.log('breath')
  bubbleBindClick()
  return;
}

// hunger角色的click
function hungerClick() {
  console.log('hunger')
  bubbleBindClick()
  return;
}

// 点击触发bubble冒出
function bubbleBindClick() {
  if (bubbleClick) return;
  bubbleClick = true;
  addTextBubble()
}

// 获取随机提示语
function getRandomText() {
  var time = new Date();
  var hours = time.getHours();
  var textArr = [];
  var text = '';

  if (isHunger) {
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

// 增加文字气泡
function addTextBubble() {
  let t = getRandomText()
  let role = roleArr[state]

  var pWidth = parseInt(Math.abs(role.width))
  var bubbleX = role.x > screenWidth / 2
    ? role.x - pWidth / 2
    : role.x + pWidth / 2;

  bubbleBg = game.add.sprite(bubbleX, role.y - role.height, 'bubble');
  bubbleBg.scale.x = role.x > screenWidth / 2 ? -1 : 1;
  bubbleBg.alpha = 0;
  let x = Math.floor(bubbleBg.x + bubbleBg.width / 2) + (role.x > screenWidth / 2 ? -10 : 10),
    y = Math.floor(bubbleBg.y + bubbleBg.height / 2) + 10;
  var style = { font: t.fontSize + "px CenturyGothic-Bold", fill: "#FEAE24", wordWrap: true, wordWrapWidth: Math.abs(bubbleBg.width), align: "center" }
  bubbleText = game.add.text(x, y, t.text, style)
  bubbleText.anchor.set(0.5);
  bubbleText.alpha = 0;

  bgTween = game.add.tween(bubbleBg).to({ alpha: 1, y: bubbleBg.y - 50 }, 300, "Linear", true);
  textTween = game.add.tween(bubbleText).to({ alpha: 1, y: bubbleText.y - 50 }, 300, "Linear", true);
  bgTween.onComplete.addOnce(tweenNext, this);
}

// 气泡动画的下一步
function tweenNext(num) {
  textTween = game.add.tween(bubbleText).to({ alpha: 0, y: bubbleText.y + 50 }, 300, "Linear", true, num == 1 ? 0 : 2700);
  bgTween = game.add.tween(bubbleBg).to({ alpha: 0, y: bubbleBg.y + 50 }, 300, "Linear", true, num == 1 ? 0 : 2700);

  bgTween.onComplete.add(clearBubble, this);
}

// 清除气泡
function clearBubble() {
  if (bubbleBg) {
    bubbleBg.destroy();
    bubbleText.destroy();
    bubbleBg = null;
    bubbleText = null;
  }
  bubbleClick = false;
}

// 初始化熊猫
function initPanda({ level = 1, isHunger = 0, cloth = 0, bg = 0 }) {
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

// 换衣服：不同动作角色的skin重新绑定一次click事件
function changeCloth(num) {
  roleArr.forEach((itm, idx) => {
    itm.setSkinByName(num);
    itm.setToSetupPose();

    setTimeout(() => {
      actionRoleBindClick(idx)
    }, 300)
  })
}

// 换背景
function changeBg(num) {
  bgIn = num;
}

export {
  initPanda,
  changeCloth,
  changeBg
}