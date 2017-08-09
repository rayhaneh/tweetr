// This file

// keyup/down/press handerlers will not work in case user copy/pastes using mouse (not keyboard).
// Change/Blur handlers will not work because they only fire after the user deselects the input box.

$(document).ready(function() {

  let textElm    = $("#new-tweet textarea")
  let counterElm = textElm.closest("form").children('.counter')


  textElm.on("input",function (event) {
    counter = 140 - $(this).val().length
    counterElm.text(counter)
    $(".error").hide()

    // Adding/removing the negative class to .counter
    // Checks if it already has that class to prevent re-adding!
    if (counter < 0 && !counterElm.hasClass("negative")) {
      counterElm.addClass("negative")
    }
    else if (counter >= 0 && counterElm.hasClass("negative")) {
      counterElm.removeClass("negative")
    }
  })

})