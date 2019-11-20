import { changeBg, changeCloth } from "./panda.js";


$('.options .cloth').on('click', function () {
  changeCloth($(this).html())
})


$('.options .bg').on('click', function () {
  changeBg($(this).html())
})




