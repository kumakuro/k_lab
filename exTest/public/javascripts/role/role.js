// 目标屏幕尺寸
const screenWidth = 2018;
const screenHeight = 1536;
const screenRealWidth = document.documentElement.clientWidth || document.body.clientWidth;
const factRatio = screenRealWidth / screenWidth
const screenRealHeight = parseInt(factRatio * screenHeight)
const animasArr = ['you', 'yijihuxi', 'yijijie']


var game;
var filePath = '',
    bgFileArr = [], bgSetArr = [], bgNum = 0, bgIn = null,
    roleFileArr = [], roleSetArr = [], roleIn,
    stateNum = 1, stateIn = null,
    clothNum, // 0-walk,1-breath,2-hunger
    bindBodyArr = [false, false, false];  

var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: screenRealWidth,
    height: screenRealHeight,
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

function preload() {
    bgFileArr.forEach((itm, idx) => {
        this.load.image('bg' + idx, itm)
    })

    this.load.setPath(filePath);
    roleFileArr.forEach((itm, idx) => {
        var itmArr = Object.keys(itm)
        for (let i in itmArr) {
            this.load.spine(itmArr[i] + '_' + idx, itm[itmArr[i]] + '.json', itm[itmArr[i]] + '.atlas');
        }
    })
}

function create() {
    bgFileArr.forEach((itm, idx) => {
        var temp = this.add.image(0, 0, 'bg' + idx).setOrigin(0);
        temp.scale = factRatio;
        temp.alpha = 0;
        bgSetArr.push(temp)
    })

    var roleItem = roleFileArr[roleIn]
    var itmArr = Object.keys(roleItem)

    for (let i in itmArr) {
        var temp = this.add.spine(
            screenRealWidth / 2,
            screenRealHeight / 2 + 200,
            itmArr[i] + '_' + roleIn,
            animasArr[i],
            true
        );
        temp.setScale(factRatio * 0.4).setFlipX(true);
        temp.setSkinByName(1);
        temp.alpha = i == stateNum ? 1 : 0

        roleSetArr.push(temp)
    }
}

function update() {
    if (bgNum != bgIn && bgIn != null) {
        bgNum = bgIn
        setBgAlpha(bgNum)
    }
}

// 换衣服
function changeCloth(num) {
    roleSetArr.forEach((itm, idx) => {
        itm.setSkinByName(num);
        itm.setToSetupPose();

        setTimeout(() => {
            actionRoleBindClick(idx)
        }, 300)
    })
}

// 给三个动作角色的skeleton的每个部位绑定click事件
function actionRoleBindClick(idx) {
    bindBodyArr[idx] = true
    let role = roleSetArr[idx]
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


// 设置背景的透明度
function setBgAlpha(idx) {
    bgSetArr.forEach((itm, idx) => {
        itm.alpha = 0
        if (idx == bgIn) {
            itm.alpha = 1
        }
    })
}

function initRole({ roleIdx, bgIdx }, path, bg, role) {
    filePath = path;
    bgFileArr = bg;
    roleFileArr = role;
    roleIn = roleIdx;
    bgIn = bgIdx;

    console.log()

    setTimeout(() => {
        game = new Phaser.Game(config);
    }, 300)
}

export {
    initRole
}



// var config = {
//     type: Phaser.WEBGL,
//     parent: 'phaser-example',
//     width: 800,
//     height: 600,
//     backgroundColor: '#22ffff',
//     scene: {
//         preload: preload,
//         create: create,
//         update: update,
//         pack: {
//             files: [
//                 { type: 'scenePlugin', key: 'SpinePlugin', url: '/javascripts/role/plugins/SpinePlugin.js', sceneKey: 'spine' }
//             ]
//         }
//     }
// };

// function preload() {
//     this.load.setPath('/javascripts/role/spine/');

//     this.load.spine('hunger', 'yijijie.json', 'yijijie.atlas');
//     this.load.spine('breath', 'yijihuxi.json', 'yijihuxi.atlas');
//     this.load.spine('walk', 'yijizoulu.json', 'yijizoulu.atlas');
// }

// function create() {

//     var hunger = this.add.spine(500, 300, 'hunger', 'yijijie', true);
//     console.log('hunger-b->', hunger.width, hunger.height)
//     hunger.setScale(0.2).setFlipX(true);
//     hunger.setSkinByName(1);
//     console.log('hunger-a->', hunger.width, hunger.height)

//     var breath = this.add.spine(300, 300, 'breath', 'yijihuxi', true);
//     console.log('breath-b->', breath.width, breath.height)
//     breath.setScale(0.2).setFlipX(true);
//     breath.setSkinByName(1);
//     console.log('breath-a->', breath.width, breath.height)

//     var walk = this.add.spine(100, 300, 'walk', 'you', true);
//     console.log('walk-b->', walk.width, walk.height)
//     walk.setScale(0.2).setFlipX(true);
//     walk.setSkinByName(1);
//     console.log('walk-a->', walk.width, walk.height)

// }

// function update(time, delta) {
// }