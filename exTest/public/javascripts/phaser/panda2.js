var clothNum = 4;
var backgroundNum = 4;

var GameScene = new Phaser.Class(
  {
    Extends: Phaser.Scene,
    initialize:
      function GameScene() {
        Phaser.Scene.call(this, { key: 'gameScene', active: true });

        this.playerGroup = null;
        this.clothNum = clothNum;
        this.backgroundNum = backgroundNum;

        this.speed = 1;
        this.targetX = 100;
        this.targetY = 450;
      },

    preload: function () {
      this.load.image('sky1', '../images/panda/sky1.png');
      this.load.image('sky2', '../images/panda/sky2.png');
      this.load.image('sky3', '../images/panda/sky3.png');
      this.load.image('sky4', '../images/panda/sky4.png');
      this.load.image('ground', '../images/panda/platform.png');
      this.load.spritesheet('dude1', '../images/panda/dude1.png', { frameWidth: 32, frameHeight: 48 });
      this.load.spritesheet('dude2', '../images/panda/dude2.png', { frameWidth: 32, frameHeight: 48 });
      this.load.spritesheet('dude3', '../images/panda/dude3.png', { frameWidth: 32, frameHeight: 48 });
      this.load.spritesheet('dude4', '../images/panda/dude4.png', { frameWidth: 32, frameHeight: 48 });
    },
    create: function () {
      this.playerGroup = this.add.group();

      this.sky = this.add.image(400, 300, 'sky' + this.backgroundNum);
      this.platforms = this.physics.add.staticGroup();
      this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

      this.input.mouse.capture = true;
      this.input.on('pointerdown', this.moveDude, this)

      this.playerGroup.add(this.initDude(this.clothNum, this.backgroundNum));
      this.physics.add.collider(this.playerGroup, this.platforms);
    },
    update: function () {
      if (clothNum != this.clothNum) {
        this.clothNum = clothNum;
        this.playerGroup.clear();
        this.playerGroup.add(this.initDude(clothNum));
      }
      if (backgroundNum != this.backgroundNum) {
        this.backgroundNum = backgroundNum;
        this.sky = this.add.image(400, 300, 'sky' + this.backgroundNum);
      }

      var player = this.playerGroup.children.entries[this.playerGroup.children.entries.length - 1];

      if (Math.floor(this.targetX) - Math.floor(player.x) > 5) {
        player.setVelocityX(100);
        player.anims.play('right' + clothNum, true);
      } else if (Math.floor(player.x) - Math.floor(this.targetX) > 5) {
        player.setVelocityX(-100);
        player.anims.play('left' + clothNum, true);
      } else {
        player.setVelocityX(0);
        player.anims.play('turn' + clothNum);
      }
    },
    initDude: function (clothNum) {
      let clothImg = 'dude' + clothNum
      var player = this.physics.add.sprite(this.targetX, this.targetY, clothImg);
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);
      player.setInteractive();
      player.on('pointerdown', this.clickDude, this)

      this.anims.create({
        key: 'left' + clothNum,
        frames: this.anims.generateFrameNumbers(clothImg, { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'turn' + clothNum,
        frames: [{ key: clothImg, frame: 4 }],
        frameRate: 20
      });

      this.anims.create({
        key: 'right' + clothNum,
        frames: this.anims.generateFrameNumbers(clothImg, { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
      });

      return player
    },
    clickDude: function () {
      console.log('clickDude')
    },
    moveDude: function () {
      this.targetX = this.input.x
      this.targetY = this.input.y

      console.log('move?')
    },
    setDudeAlpha: function (num) {
    }
  }
);


var config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaserSet',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: GameScene
};

var game = new Phaser.Game(config);

function changeBg(num) {
  backgroundNum = num;
}
function changeCloth(num) {
  clothNum = num;
}

export {
  changeBg,
  changeCloth
};