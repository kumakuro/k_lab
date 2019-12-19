var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#22ffff',
    scene: {
        preload: preload,
        create: create,
        update: update,
        pack: {
            files: [
                { type: 'scenePlugin', key: 'SpinePlugin', url: '/javascripts/role/plugins/SpinePlugin.js', sceneKey: 'spine' }
            ]
        }
    }
};

var controls;

var game = new Phaser.Game(config);

function preload() {
    this.load.setPath('/javascripts/role/spine/');

    this.load.spine('hunger', 'yijijie.json', 'yijijie.atlas');
    this.load.spine('breath', 'yijihuxi.json', 'yijihuxi.atlas');
    this.load.spine('walk', 'yijizoulu.json', 'yijizoulu.atlas');
}

function create() {

    var hunger = this.add.spine(500, 300, 'hunger', 'yijijie', true);
    console.log('hunger-b->', hunger.width, hunger.height)
    hunger.setScale(0.2).setFlipX(true);
    hunger.setSkinByName(1);
    console.log('hunger-a->', hunger.width, hunger.height)

    var breath = this.add.spine(100, 300, 'breath', 'yijihuxi', true);
    console.log('breath-b->', breath.width, breath.height)
    breath.setScale(0.2).setFlipX(true);
    breath.setSkinByName(1);
    console.log('breath-a->', breath.width, breath.height)

    var walk = this.add.spine(300, 300, 'walk', 'you', true);
    console.log('walk-b->', walk.width, walk.height)
    walk.setScale(0.2).setFlipX(true);
    walk.setSkinByName(1);
    console.log('walk-a->', walk.width, walk.height)

}

function update(time, delta) {
}