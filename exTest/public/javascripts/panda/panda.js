
const screenWidth = 2048;
const screenHeight = 1536;
const pandaRatio = 0.65;
var game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, 'phaser-example',
  {
    preload: preload,
    create: create,
    update: update
  }
);

var targetX = screenWidth / 2;
var stateArr = ['idle', 'walk', 'hunger'];
var pandaPlayer;

function preload() {
  game.load.image('bg', '/javascripts/panda/image/bg1.png')

  game.plugins.add(Fabrique.Plugins.Spine);
  game.load.spine('panda', '/javascripts/panda/shengdanyouniance.json');

  var bar = game.add.graphics();
  bar.beginFill(0x000000, 0.2);
  bar.drawRect(0, 100, 800, 100);

}

function create() {
  var bg = game.add.sprite(0, 0, 'bg');
  pandaPlayer = game.add.spine(targetX, screenHeight / 2 + 600, 'panda');
  pandaPlayer.scale.x = pandaRatio
  pandaPlayer.scale.y = pandaRatio

  pandaPlayer.setAnimationByName(0, 'walk', true);
  pandaPlayer.setSkinByName('2');

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
    pandaPlayer.x += 8;
  }
  if (targetX < parseInt(pandaPlayer.x)) {
    pandaPlayer.x -= 8;
  }
}


function initPanda(data) {
  console.log('initPanda->', data)
}
function changeCloth() { }
function changeBg() { }

export {
  initPanda,
  changeCloth,
  changeBg
}