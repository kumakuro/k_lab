import {
    initRole
} from '../role/role.js'

const bgArr = [
    '/javascripts/role/image/scene1.jpg',
    '/javascripts/role/image/scene2.jpg',
    '/javascripts/role/image/scene3.jpg',
    '/javascripts/role/image/scene4.jpg'
]

const roleArr = [
    {
        'walk': 'yijizoulu',
        'breath': 'yijihuxi',
        'hunger': 'yijijie'
    },
    {
        'walk': 'yijizoulu1',
        'breath': 'yijihuxi1',
        'hunger': 'yijijie1'
    },
    {
        'walk': 'yijizoulu2',
        'breath': 'yijihuxi2',
        'hunger': 'yijijie2'
    }
]

const filePath = '/javascripts/role/spine/'


setTimeout(() => {
    initRole(
        {
            roleIdx: 2,
            bgIdx: 2
        },
        filePath,
        bgArr,
        roleArr
    )
}, 300)

