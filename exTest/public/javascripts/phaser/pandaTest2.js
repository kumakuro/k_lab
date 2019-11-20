import { changeBg, changeCloth } from "./panda2.js";


$('.options .cloth').on('click', function () {
  changeCloth($(this).html())
})


$('.options .bg').on('click', function () {
  changeBg($(this).html())
})




