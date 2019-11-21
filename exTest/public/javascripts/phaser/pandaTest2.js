import { initGameScene, changeBg, changeCloth } from "./panda2.js";

setTimeout(() => {
  initGameScene({
    name: 'ssss',
    num: 12
  })
}, 3000)

$('.options .cloth').on('click', function () {
  changeCloth($(this).html())
})

$('.options .bg').on('click', function () {
  changeBg($(this).html())
})




