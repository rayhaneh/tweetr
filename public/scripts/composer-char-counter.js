let textElm    = $(".new-tweet textarea")
let counterElm = textElm.closest("form").children('.counter')

textElm.on("keyup",function (event) {

  counter = 140 - $(this).val().length
  counterElm.text(counter)

  if (counter < 0 && !counterElm.hasClass("negative")) {
    counterElm.addClass("negative")
  }
  else if (counter >= 0 && counterElm.hasClass("negative")) {
    counterElm.removeClass("negative")
  }

})

