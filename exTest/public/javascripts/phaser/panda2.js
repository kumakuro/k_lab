import { santaJson } from './santa.js'

var clothNum = 1;
var backgroundNum = 1;



var GameScene = new Phaser.Class(
  {
    Extends: Phaser.Scene,
    initialize:
      function GameScene() {
        Phaser.Scene.call(this, { key: 'gameScene', active: true });

        this.player = null;
        this.playerGroup = null;
        this.clothNum = clothNum;
        this.backgroundNum = backgroundNum;

        this.speed = 1;
        this.targetX = 300;
        this.targetY = 450;

        this.bgSourceArr = [];
        this.bgArr = [];
        
        this.ground = null;
      },

    preload: function () {
      let keyArr = Object.keys(santaJson)
      for (let i in keyArr) {
        let itmArr = santaJson[keyArr[i]]

        if (keyArr[i] === 'role') {
          itmArr.forEach((itm, idx) => {
            this.load.spritesheet(keyArr[i] + (idx * 1 + 1), itm, { frameWidth: 470, frameHeight: 680 });
          })
        }

        if (keyArr[i] === 'background') {
          itmArr.forEach((itm, idx) => {
            this.load.image(keyArr[i] + (idx * 1 + 1), itm);
            this.bgSourceArr.push(keyArr[i] + (idx * 1 + 1))
          })
        }
      }
    },
    create: function () {
      this.playerGroup = this.add.group();

      for (let i in this.bgSourceArr) {
        var bg = this.add.image(512, 384, this.bgSourceArr[i]);
        bg.setScale(0.5);
        bg.num = i * 1 + 1;
        bg.alpha = i === '0' ? 1 : 0;
        this.bgArr.push(bg)
      }

      this.input.mouse.capture = true;
      this.input.on('pointerdown', this.moveDude, this)

      this.player = this.initDude(this.clothNum);
      this.playerGroup.add(this.player);
      
    },
    update: function () {
      if (clothNum != this.clothNum) {
        this.clothNum = clothNum;
        this.player.destroy();
        this.player = this.initDude(clothNum)
        this.playerGroup.add(this.player);
      }
      if (backgroundNum != this.backgroundNum) {
        this.backgroundNum = backgroundNum;
        this.bgArr.forEach(itm => {
          if (itm.num == backgroundNum) {
            itm.alpha = 1
          } else {
            itm.alpha = 0
          }
        });
      }

      var player = this.playerGroup.children.entries[this.playerGroup.children.entries.length - 1];

      if (Math.floor(this.targetX) - Math.floor(player.x) > 50) {
        player.setVelocityX(100);
        player.anims.play('right' + clothNum, true);
      } else if (Math.floor(player.x) - Math.floor(this.targetX) > 50) {
        player.setVelocityX(-100);
        player.anims.play('left' + clothNum, true);
      } else {
        player.setVelocityX(0);
        player.anims.play('turn' + clothNum);
      }
    },
    initDude: function (clothNum) {
      let clothImg = 'role' + clothNum
      var player = this.physics.add.sprite(this.targetX, this.targetY, clothImg);
      player.setId = clothNum;
      player.setScale(0.5);
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);
      player.setInteractive();
      player.on('pointerdown', this.clickDude, this)

      this.anims.create({
        key: 'left' + clothNum,
        frames: this.anims.generateFrameNumbers(clothImg, { start: 5, end: 9 }),
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
        frames: this.anims.generateFrameNumbers(clothImg, { start: 5, end: 9 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'breath' + clothNum,
        frames: this.anims.generateFrameNumbers(clothImg, { start: 0, end: 3 }),
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
    width: 1024,
    height: 768
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