import {
  initPanda,
  changeCloth,
  changeBg,
  changeRole,
  changeHunger
} from '../panda/panda.2.js'


$('.option .cloth').on('click', 'li', function () {
  changeCloth($(this).html())
})

$('.option .bg').on('click', 'li', function () {
  changeBg($(this).html())
})

$('.option .level').on('click', 'li', function () {
  changeRole($(this).html())
})

$('.option .hunger').on('click', 'li', function () {
  changeHunger($(this).html())
})

setTimeout(function () {
  initPanda({
    level: 1,
    isHunger: 0,
    cloth: 1,
    bg: 1
  })
}, 300)

