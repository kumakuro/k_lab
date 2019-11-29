
const screenWidth = 1024;
const screenHeight = 768;
const bgRatio = 0.5;
const pandaRatio = 0.35;

var targetX = screenWidth / 2;
var stateArr = ['idle', 'walk', 'hunger'];
var pandaPlayer;
var bg;

var game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, 'phaserSet',
  {
    preload: preload,
    create: create,
    update: update
  }
);

function preload() {
  game.load.image('bg', '/javascripts/panda/image/bg1.png')
  // game.load.image('bg', '/javascripts/panda/image/bg0.png')
  game.plugins.add(Fabrique.Plugins.Spine);
  game.load.spine('panda', '/javascripts/panda/shengdanyouniance.json');

  var bar = game.add.graphics();

  game.load.onFileComplete.add(progress => {
    console.log(progress)
    bar.beginFill(0xffffff, 1);
    bar.drawRect(0, screenHeight / 2 - 200, screenWidth * (progress / 100), 100);
  }, game);
}

function create() {
  bg = game.add.sprite(0, 0, 'bg');
  bg.scale.x = bgRatio
  bg.scale.y = bgRatio
  bg.inputEnabled = true;
  bg.events.onInputDown.add(() => {
    targetX = parseInt(game.input.activePointer.position.x);
    if (targetX > parseInt(pandaPlayer.x)) {
      pandaPlayer.scale.x = pandaRatio
    }
    if (targetX < parseInt(pandaPlayer.x)) {
      pandaPlayer.scale.x = -1 * pandaRatio
    }
    pandaPlayer.setToSetupPose();
  }, this)

  pandaPlayer = game.add.spine(targetX, screenHeight / 2 + 250, 'panda');
  pandaPlayer.scale.x = pandaRatio
  pandaPlayer.scale.y = pandaRatio
  pandaPlayer.setAnimationByName(0, 'walk', true);
  pandaPlayer.setSkinByName('2');

}

function update() {

  if (targetX > parseInt(pandaPlayer.x)) {
    pandaPlayer.x += 8 * bgRatio;
  }
  if (targetX < parseInt(pandaPlayer.x)) {
    pandaPlayer.x -= 8 * bgRatio;
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