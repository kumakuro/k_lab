
const screenWidth = 1024;
const screenHeight = 768;
const bgRatio = 0.5;
const pandaRatio = 0.35;

var targetX = screenWidth / 2;
var stateArr = ['idle', 'walk', 'hunger'];
var bgArr = [], bgNum = 0;
var pandaPlayer, game;


function preload() {
  game.load.image('bg1', '/javascripts/panda/image/bg1.png')
  game.load.image('bg0', '/javascripts/panda/image/bg0.png')

  game.plugins.add(Fabrique.Plugins.Spine);
  game.load.spine('panda', '/javascripts/panda/shengdanyouniance.json');

  var bar = game.add.graphics();

  game.load.onFileComplete.add(progress => {
    bar.beginFill(0xffffff, 1);
    bar.drawRect(0, screenHeight / 2 - 200, screenWidth * (progress / 100), 50);
    bar.clear();
  }, game);

}

function create() {
  var bg0 = game.add.sprite(0, 0, 'bg0');
  bg0.alpha = 0;
  bg0.scale.x = bgRatio;
  bg0.scale.y = bgRatio;
  bg0.num = 0;
  var bg1 = game.add.sprite(0, 0, 'bg1');
  bg1.alpha = 0;
  bg1.scale.x = bgRatio;
  bg1.scale.y = bgRatio;
  bg1.num = 1;
  bgArr.push(bg1)
  bgArr.push(bg0)

  bgArr.map(itm => {
    if (itm.num === bgNum) {
      itm.alpha = 1;
    } else {
      itm.alpha = 0;
    }
  })

  pandaPlayer = game.add.spine(targetX, screenHeight / 2 + 250, 'panda');
  pandaPlayer.setSkinByName('1');
  pandaPlayer.setToSetupPose();

  pandaPlayer.scale.x = pandaRatio
  pandaPlayer.scale.y = pandaRatio

  let skeleton = pandaPlayer.skeleton.slots
  console.log('pandaPlayer->', pandaPlayer.skeleton.slots)
  for (let i in skeleton) {
    let stm = skeleton[i]
    console.log(i, '->', stm.sprites)
  }

  pandaPlayer.setAnimationByName(0, 'walk', true);

  // for (var i in pandaPlayer.children) {
  //   var itm = pandaPlayer.children[i]
  //   console.log('**', i, itm.children.length, '**', itm)
  //   itm.setAll('inputEnabled', true)
  //   itm.callAll('events.onInputDown.add', 'events.onInputDown', clickPanda)
  // }

  game.input.onDown.add(function () {
    targetX = parseInt(game.input.activePointer.position.x);
    if (targetX > parseInt(pandaPlayer.x)) {
      pandaPlayer.scale.x = pandaRatio
    }
    if (targetX < parseInt(pandaPlayer.x)) {
      pandaPlayer.scale.x = -1 * pandaRatio
    }
    pandaPlayer.setToSetupPose();
  });
}

function update() {

  if (targetX > parseInt(pandaPlayer.x)) {
    pandaPlayer.x += 8 * bgRatio;
  }
  if (targetX < parseInt(pandaPlayer.x)) {
    pandaPlayer.x -= 8 * bgRatio;
  }
}

function clickPanda() {
  console.log('clickPanda-click')
}

function initPanda(data) {
  console.log('initPanda->', data)
  game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, 'phaserSet',
    {
      preload: preload,
      create: create,
      update: update
    }
  );
}

function changeCloth(num) {
  console.log('changeCloth->', num)
  pandaPlayer.setSkinByName(num);
  pandaPlayer.setToSetupPose();
}

function changeBg(num) {
  console.log('changeBg->', num)
}

export {
  initPanda,
  changeCloth,
  changeBg
}