const log = console.log.bind(console)

const containerHeight = Number(localStorage.getItem("showHeight")) || window.innerHeight
const containerWidth = containerHeight * 4 / 3;
const factRatio = containerWidth / 1024;
const screenWidth = containerWidth;
const screenHeight = containerHeight;
const bgRatio = 0.5 * factRatio;
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
    fontSize: 20
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
const bgFileArr = [
  '',
  'https://imagine-cn.s3.cn-north-1.amazonaws.com.cn/iw/pets_image/pet-phaser-master/image/bg0.jpg',
  'https://imagine-cn.s3.cn-north-1.amazonaws.com.cn/iw/pets_image/pet-phaser-master/image/bg2.jpg',
  'https://imagine-cn.s3.cn-north-1.amazonaws.com.cn/iw/pets_image/pet-phaser-master/image/bg3.jpg',
  'https://imagine-cn.s3.cn-north-1.amazonaws.com.cn/iw/pets_image/pet-phaser-master/image/bg4.jpg'
];
const musicFileArr = [
  '',
  'https://imagine-cn.s3.cn-north-1.amazonaws.com.cn/iw/pets_image/pet-scene-audio/chun0.mp3',
  'https://imagine-cn.s3.cn-north-1.amazonaws.com.cn/iw/pets_image/pet-scene-audio/dong2.mp3',
  'https://imagine-cn.s3.cn-north-1.amazonaws.com.cn/iw/pets_image/pet-scene-audio/xia3.mp3',
  'https://imagine-cn.s3.cn-north-1.amazonaws.com.cn/iw/pets_image/pet-scene-audio/qiu4.mp3'
];
const roleFileArr = [
  [
    {
      "roleWalk": "https://imagine-cn.s3.cn-north-1.amazonaws.com.cn/iw/pets_image/pet-phaser-master/yijizoulu.json",
      "roleBreath": "https://imagine-cn.s3.cn-north-1.amazonaws.com.cn/iw/pets_image/pet-phaser-master/yijihuxi.json",
      "roleHunger": "https://imagine-cn.s3.cn-north-1.amazonaws.com.cn/iw/pets_image/pet-phaser-master/yijijie.json"
    },
    {
      "roleWalk": "https://imagine-cn.s3.cn-north-1.amazonaws.com.cn/iw/pets_image/pet-phaser-master/yijizoulu.1.json",
      "roleBreath": "https://imagine-cn.s3.cn-north-1.amazonaws.com.cn/iw/pets_image/pet-phaser-master/yijihuxi.1.json",
      "roleHunger": "https://imagine-cn.s3.cn-north-1.amazonaws.com.cn/iw/pets_image/pet-phaser-master/yijijie.1.json"
    },
    {
      "roleWalk": "https://imagine-cn.s3.cn-north-1.amazonaws.com.cn/iw/pets_image/pet-phaser-master/yijizoulu.1.json",
      "roleBreath": "https://imagine-cn.s3.cn-north-1.amazonaws.com.cn/iw/pets_image/pet-phaser-master/yijihuxi.1.json",
      "roleHunger": "https://imagine-cn.s3.cn-north-1.amazonaws.com.cn/iw/pets_image/pet-phaser-master/yijijie.1.json"
    }
  ],
  [
    {
      "roleWalk": "https://imagine-cn.s3.cn-north-1.amazonaws.com.cn/iw/pets_image/pet-phaser-master/fix-phone/yijizoulu.json",
      "roleBreath": "https://imagine-cn.s3.cn-north-1.amazonaws.com.cn/iw/pets_image/pet-phaser-master/fix-phone/yijihuxi.json",
      "roleHunger": "https://imagine-cn.s3.cn-north-1.amazonaws.com.cn/iw/pets_image/pet-phaser-master/fix-phone/yijijie.json"
    }
  ]
]
const animsObj = {
  'roleWalk': 'you',
  'roleBreath': 'yijihuxi',
  'roleHunger': 'yijijie'
}
var levelIn = null, deviceTypeIn = null, pandaRatio = null;


var dom = "#phaserSet"
var game, roleArr = []; // 新增三种动作的角色
var vPlayArr = [], currentSound, testSound;
var bindBodyArr = [false, false, false];// 给对应的状态绑定click事件
var bubbleBg, bubbleText, bubbleClick = false; // 气泡背景图，气泡文字
var targetX = screenWidth / 2; // 角色移动位置
var bgArr = [], bgNum = 0, bgIn = 0; // 0-竹林，1-竹林, 2-沙滩，3-秋天，4-圣
var clothArr = ['1', '5', '3', '4', '2'], clothIn = 0; // 1-没衣服，2-圣诞
var state = 1, stateIn = null; // 0-walk;1-breath;2-hunger;
var isHunger = 0, isHungerIn = null;
var breathCount = 0; //  呼吸达到1000时，触发左右两步晃
var bgTween, textTween; // 气泡的背景和文字

function preload() {

  $('#phaserSet').append('<div class="progressLayer"></div>')
  $('#phaserSet .progressLayer').append('<div class="progressBox"></div>')
  $('#phaserSet .progressBox').append('<div class="text"></div>')
  $('#phaserSet .progressBox').append('<div class="bar"></div>')
  $('#phaserSet .progressBox .bar').append('<div class="fill"></div>')

  let $layer = $('#phaserSet .progressLayer')
  let $pBox = $('#phaserSet .progressLayer .progressBox')
  let $text = $('#phaserSet .progressLayer .progressBox .text')
  let $bar = $('#phaserSet .progressLayer .progressBox .bar')
  let $fill = $('#phaserSet .progressLayer .progressBox .bar .fill')

  $('#phaserSet').css("position", "relative")
  $layer.css({
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    top: 0
  })

  $pBox.css({
    width: '30%',
    height: '13%',
    position: 'absolute',
    top: '43%',
    left: '35%'
  })

  $text.css({
    'text-align': 'center',
    'margin-bottom': '30px',
    'font-size': 25 * factRatio + 'px'
  })

  $bar.css({
    'width': '100%',
    'height': 25 * factRatio + 'px',
    'background-color': 'rgba(0,0,0,0.2)',
    'border-radius': '10px'
  })

  $fill.css({
    'width': '0%',
    'height': '100%',
    'background-color': 'orange',
    'border-radius': '10px'
  })

  $('canvas').css('opacity', '0')

  game.load.onFileComplete.add(progress => {
    $text.text(`加载中...${progress}%`);
    $fill.css('width', `${progress}%`)
    if (progress === 100) {
      $layer.remove();
      $('canvas').css('opacity', '1');
    }
  }, game);

  bgFileArr.forEach((itm, idx) => {
    if (itm && itm != '') {
      game.load.image('bg' + idx, itm + '?v=' + Math.random())
    } else {
      game.load.image('bg' + idx, bgFileArr[1] + '?v=' + Math.random())
    }
  })

  game.load.image('bubble', 'https://imagine-cn.s3.cn-north-1.amazonaws.com.cn/iw/pets_image/pet-phaser-master/image/bubble.png')
  game.add.plugin(PhaserSpine.SpinePlugin);

  log('deviceType:0-pad,1-phone; ->', deviceTypeIn, roleFileArr)
  pandaRatio = deviceTypeIn == 1 ? factRatio : 0.25 * factRatio;
  var rfArr = roleFileArr[deviceTypeIn]
  for (let i in rfArr) {
    let itm = rfArr[i]
    if (levelIn == null || i != levelIn) continue;

    let rArr = Object.keys(itm)
    for (let r in rArr) {
      let str = itm[rArr[r]] + '?v=' + parseInt(Math.random() * 10)
      game.load.spine(rArr[r] + i, str)
    }
  }

  musicFileArr.forEach((itm, idx) => {
    if (itm != '') {
      game.load.audio('voice' + idx, itm)
    }
  })

  game.load.crossOrigin = 'anonymous';
}

function create() {
  // 背景音乐
  musicFileArr.forEach((itm, idx) => {
    var temp = game.add.audio('voice' + (itm != '' ? idx : 0))
    vPlayArr.push(temp)
  })

  // 背景图
  for (let i = 0; i < 5; i++) {
    let bg;
    if (i == 0 || i == 1) {
      bg = game.add.sprite(0, 0, 'bg0');
    } else {
      bg = game.add.sprite(0, 0, 'bg' + i);
    }

    bg.alpha = 0;
    bg.scale.x = bgRatio;
    bg.scale.y = bgRatio;
    bg.num = i;
    bg.events.onInputDown.add(() => {
      defineBgSpriteClick()
    })
    bgArr.push(bg)
  }
  if (bgNum != bgIn) {
    bgNum = bgIn;
  }
  changeBgArr()


  for (let i in animsObj) {
    let temp = game.add.spine(targetX, screenHeight / 2 + 250 * factRatio, i + levelIn);
    temp.scale.x = pandaRatio
    temp.scale.y = pandaRatio
    temp.setSkinByName(clothArr[clothIn]);
    temp.setToSetupPose();
    temp.setAnimationByName(0, animsObj[i], true);
    temp.alpha = 0;
    roleArr.push(temp)
  }

  roleArr[state].alpha = 1;
}

function update() {
  // 切换背景图
  if (bgNum != bgIn) {
    bgNum = bgIn;
    changeBgArr()
  }
  // 是否饥饿
  if (isHunger != isHungerIn && isHungerIn != null) {
    isHunger = isHungerIn
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
  if (targetX - 100 * factRatio > parseInt(roleArr[0].x)) {
    roleArr[0].x += isHunger == 1 ? 8 * bgRatio * 0.2 : 8 * bgRatio;
    syncAllRoleX(0, roleArr[0].x)
  }
  if (targetX < parseInt(roleArr[0].x) - 100 * factRatio) {
    roleArr[0].x -= isHunger == 1 ? 8 * bgRatio * 0.2 : 8 * bgRatio;
    syncAllRoleX(0, roleArr[0].x)
  }
  if (Math.abs(targetX - parseInt(roleArr[0].x)) <= 100 * factRatio) {
    stateIn = isHunger == 1 ? 2 : 1;
  }

  // breath状态判定
  if (state == 1) {
    breathCount++;
    if (breathCount == 300) {
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

// 呼吸时产生的走动
function getBreathActionRandom() {
  let num = 0,
    randomNum = parseInt(Math.random() * 2),
    walkDistance = 200 * factRatio;

  if (randomNum == 1) {
    if (screenHeight - roleArr[0].x < 230 * factRatio) {
      num = parseInt(roleArr[0].x - walkDistance)
    } else {
      num = parseInt(roleArr[0].x + walkDistance)
    }
  } else {
    if (roleArr[0].x - 0 < 250) {
      num = parseInt(roleArr[0].x + walkDistance)
    } else {
      num = parseInt(roleArr[0].x - walkDistance)
    }
  }

  defineBgSpriteClick(num)
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

  breathCount = 0
  let tx = num > 0 ? num : parseInt(game.input.activePointer.position.x);
  let rWidth = parseInt(Math.abs(roleArr[0].width) / 2)

  if (tx - rWidth > parseInt(roleArr[0].x)) {
    roleArr[0].scale.x = pandaRatio;
    targetX = tx;
    stateIn = 0;
  }
  if (tx < parseInt(roleArr[0].x) - rWidth) {
    roleArr[0].scale.x = -1 * pandaRatio;
    targetX = tx;
    stateIn = 0;
  }
  if (bubbleBg && bubbleText) {
    tweenNext(1)
  }
}

// 切换背景图
function changeBgArr() {
  if (currentSound) {
    currentSound.stop()
  }
  if (bgArr.length > 0) {
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
  console.log('vPlayArr->', vPlayArr.length, bgNum)
  if (vPlayArr.length > 0) {
    if (vPlayArr[bgNum]) {
      console.log(bgNum, vPlayArr[bgNum])
      currentSound = vPlayArr[bgNum]
      currentSound.loopFull(0.6);
    }
  }
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
  targetX = roleArr[0].x;
  setTimeout(() => {
    breathClick()
  }, 300)
  return;
}

// breath角色的click
function breathClick() {
  bubbleBindClick()
  return;
}

// hunger角色的click
function hungerClick() {
  bubbleBindClick()
  return;
}

// 点击触发bubble冒出
function bubbleBindClick() {
  if (bubbleClick) return;
  breathCount = 0;
  bubbleClick = true;
  addTextBubble()
}

// 获取随机提示语
function getRandomText() {
  var time = new Date();
  var hours = time.getHours();
  var textArr = [];
  var text = '';

  if (isHunger == 1) {
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
  bubbleBg.scale.x = (role.x > screenWidth / 2 ? -1 : 1) * factRatio;
  bubbleBg.scale.y = factRatio;
  bubbleBg.alpha = 0;

  let x = Math.floor(bubbleBg.x + bubbleBg.width / 2) + (role.x > screenWidth / 2 ? -10 : 10) * factRatio,
    y = Math.floor(bubbleBg.y + bubbleBg.height / 2) + 10 * factRatio;
  var style = {
    font: t.fontSize + "px webfontB",
    fill: "#FEAE24",
    wordWrap: true,
    wordWrapWidth: Math.abs(bubbleBg.width / factRatio),
    align: "center"
  }
  bubbleText = game.add.text(x, y, t.text, style)
  bubbleText.scale.x = factRatio;
  bubbleText.scale.y = factRatio;
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
function initPanda({ level, isHunger, cloth, bg, init, deviceType }) {
  switch (init) {
    case 0:
      initGameAndRole({ level, isHunger, cloth, bg, deviceType })
      break;
    case 1:
      levelIn = level
      isHungerIn = isHunger
      bgIn = bg
      changeCloth(cloth)
      break;
    default:
      break;
  }
}

// 初始化游戏和角色
function initGameAndRole({ level, isHunger, cloth, bg, deviceType }) {
  if (game) {
    destroyPanda()
  }

  levelIn = level
  isHungerIn = isHunger
  bgIn = bg
  clothIn = cloth
  deviceTypeIn = deviceType

  setTimeout(() => {
    game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, 'phaserSet',
      {
        preload: preload,
        create: create,
        update: update
      }
    );
  }, 300)
}

// 换衣服：不同动作角色的skin重新绑定一次click事件
function changeCloth(num) {
  clothIn = num;
  roleArr.forEach((itm, idx) => {
    itm.setSkinByName(clothArr[clothIn]);
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

// 切换饥饿度
function changeHunger(num) {
  isHungerIn = num;
}

// 销毁熊猫
function destroyPanda() {
  game.destroy()
  game = null;

  roleArr = []; // 新增三种动作的角色
  voiceArr = [], vPlayArr = [];
  currentSound.destroy();
  testSound.destroy();
  bindBodyArr = [false, false, false];// 给对应的状态绑定click事件
  bubbleClick = false; // 气泡背景图，气泡文字
  targetX = screenWidth / 2; // 角色移动位置
  bgArr = [], bgNum = 0, bgIn = 1;  // 0-竹林，1-竹林, 2-沙滩，3-秋天，4-圣诞
  clothIn = 0; // 1-没衣服，2-圣诞
  state = 1, stateIn = null; // 0-walk;1-breath;2-hunger;
  isHunger = 0, isHungerIn = null;
  breathCount = 0; //  呼吸达到1000时，触发左右两步晃
}
// 播放音乐
function soundPlay(num) {
  currentSound.destroy();
  testSound = vPlayArr[num]
  testSound.loopFull(0.6);
}
// 销毁音乐
function soundDestroy() {
  testSound.destroy();
  currentSound = vPlayArr[bgNum]
  currentSound.loopFull(0.6);
}


export {
  initPanda,
  changeCloth,
  changeBg,
  changeHunger,
  destroyPanda,
  soundPlay,
  soundDestroy
}