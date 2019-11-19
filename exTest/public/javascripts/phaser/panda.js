var GameScene = new Phaser.Class(
  {
    Extends: Phaser.Scene,
    initialize:
      function GameScene() {
        Phaser.Scene.call(this, { key: 'gameScene', active: true });

        this.player = null;
        this.clothNum = 3;
        this.backgroundNum = 3;

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
      this.add.image(400, 300, 'sky' + this.backgroundNum);
      var player = this.initDude('dude' + this.clothNum);
      var platforms = this.physics.add.staticGroup();
      platforms.create(400, 568, 'ground').setScale(2).refreshBody();

      this.input.mouse.capture = true;
      this.input.on('pointerdown', this.moveDude, this)

      this.physics.add.collider(player, platforms);
      this.player = player;

    },
    update: function () {
      var player = this.player;
      if (Math.floor(this.targetX) - Math.floor(player.x) > 5) {
        player.setVelocityX(100);
        player.anims.play('right', true);
      } else if (Math.floor(player.x) - Math.floor(this.targetX) > 5) {
        player.setVelocityX(-100);
        player.anims.play('left', true);
      } else {
        player.setVelocityX(0);
        player.anims.play('turn');
      }
    },
    initDude: function (img) {
      var player = this.physics.add.sprite(this.targetX, this.targetY, img);
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);
      player.setInteractive();
      player.on('pointerdown', this.clickDude, this)

      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers(img, { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'turn',
        frames: [{ key: img, frame: 4 }],
        frameRate: 20
      });

      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers(img, { start: 5, end: 8 }),
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
    },
    setDudeAlpha: function (num) {
      this.player.alpha = num;
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