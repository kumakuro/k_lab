import {
  initPanda,
  changeCloth,
  changeBg
} from '../panda/panda.1.js'


$('.option .cloth').on('click', 'li', function () {
  changeCloth($(this).html())
})

$('.option .bg').on('click', 'li', function () {
  changeBg($(this).html())
})

setTimeout(function () {
  initPanda({
    name: 'sss',
    age: 12
  })
}, 100)

