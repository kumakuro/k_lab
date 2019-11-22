import { initGameScene, changeBg, changeCloth } from "./panda2.js";

initGameScene({
  name: 'ssss',
  num: 12
})

$('.options .cloth').on('click', function () {
  changeCloth($(this).html())
})

$('.options .bg').on('click', function () {
  changeBg($(this).html())
})




