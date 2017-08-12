function removedLoggedInUserEnv(){
    $('#compose').html('')
    $('#compose-button').remove()
    $('#logout-button').remove()
}


function createLoginRegisterForm() {
  $("#log")
    .append($('<section>').attr('id','login')
      .append($('<h2>').text('Login to your account'))
      .append($('<form>')
        .attr('id','login-form').attr('method','POST').attr('action','/login')
        .append($('<div>')
          .append($('<label>').attr('for','email').text('Email:'))
          .append($('<input>').attr('id','email').attr('type','email').attr('name','email'))
          )
        .append($('<div>')
          .append($('<label>').attr('for','password').text('Password:'))
          .append($('<input>').attr('id','password').attr('type','password').attr('name','password'))
          )
        .append($('<button>')
          .attr('type', 'submit').attr("id","login-form-button")
          .append($("<i>").addClass("fa").addClass("fa-sign-in")
            .attr("aria-hidden",true)
            )
          .append('Sign In')
          )
        )
      )
    .append($('<section>').attr('id','register')
      .append($('<h2>').text('Create an account'))
      .append($('<form>')
        .attr('id','register-form').attr('method','POST').attr('action','/register')
        .append($('<div>')
          .append($('<label>').attr('for','email').text('Email:'))
          .append($('<input>').attr('id','email').attr('type','email').attr('name','email'))
          )
        .append($('<div>')
          .append($('<label>').attr('for','password').text('Password:'))
          .append($('<input>').attr('id','password').attr('type','password').attr('name','password'))
          )
        .append($('<div>')
          .append($('<label>').attr('for','name').text('Name:'))
          .append($('<input>').attr('id','name').attr('type','text').attr('name','name'))
          )
        .append($('<div>')
          .append($('<label>').attr('for','handle').text('Handle:'))
          .append($('<input>').attr('id','handle').attr('type','text').attr('name','handle'))
          )
        .append($('<button>')
          .attr('type', 'button').attr("id","register-form-button")
          .append($("<i>").addClass("fa").addClass("fa-user-plus")
            .attr("aria-hidden",true)
            )
          .append('Sign Up')
          )
        )
      );

        $('#register').hide()

}








function createLoginRegisterButton(){
  $('#nav-bar')
  .append($('<button>')
    .attr("id","login-button").attr("type","submit")
    .append($("<i>")
      .addClass("fa").addClass("fa-sign-in").attr("aria-hidden",true)
      )
    .append("Sign In")
    )
  .append($('<button>')
    .attr("id","register-button").attr("type","submit")
    .append($("<i>")
      .addClass("fa").addClass("fa-user-plus").attr("aria-hidden",true)
      )
    .append("Sign Up")
    )
}
















function createComposeLogOutButton() {
  $('#nav-bar')
  .append($('<button>')
    .attr("id","compose-button").attr("type","submit")
    .append($("<i>")
      .addClass("fa").addClass("fa-pencil-square-o").attr("aria-hidden",true)
      )
    .append("Compose")
    )
  .append($('<button>')
    .attr("id","logout-button").attr("type","submit")
    .append($("<i>")
      .addClass("fa").addClass("fa-sign-out").attr("aria-hidden",true)
      )
    .append("Sign Out")
    )





}

function addListenersToComposeLogoutButton() {
    // Listen for click on the compose button and slide it up/down
    $('#compose-button').on('click', function() {
      $("#new-tweet").slideToggle()
      $('#new-tweet textarea').focus()
    })

    $('#logout-button').on('click', function() {
      // $("#new-tweet").slideToggle()
      Cookies.remove('email')
      removedLoggedInUserEnv()
      createLoginRegisterButton()
      createLoginRegisterForm()
      addListenersToLoginRegisterButtons()
      addListenersToLoginRegisterForm()
      removeListenerToLikes()
    })



  //   $('#nav-bar').on('click', '#logout-button', function(event) {
  //     Cookies.remove()
  //     event.stopPropagation()
  //     event.preventDefault()

  //       let currentUser = Cookies.get('email')
  //       // Post the new tweet
  //       $.ajax({
  //           method: 'POST',
  //           url: '/logout',
  //       }).then(function (event) {
  //               // event.stopPropagation()
  //     // event.preventDefault()
  //       // Then, load all tweets
  //     removedLoggedInUserEnv()
  //     console.log('twice')
  //     createLoginRegisterForm()
  //     createLoginRegisterButton()
  //     addListenersToLoginRegisterButtons()
  //     addListenersToLoginRegisterForm()
  //       })

  // })
  }



function addListenerToComposeLogoutForm() {

        // Listen for new tweet submission
    $('#add-tweet-form').on('submit', function (event) {

      // Prevent default behaviour of the compose-new-tweet form
      event.preventDefault()

      // Validate the form data
      if (validateNewTweetText($(this).serializeArray()[0].value)){
        let currentUser = Cookies.get('email')
        // Post the new tweet
        $.ajax({
            method: 'POST',
            url: '/tweets',
            data: {text: $(this).serializeArray()[0].value, email: currentUser}
        }).then(function () {
        // Then, load all tweets
            loadTweets()
        })
        // Reset the form after submission
        $(this).trigger("reset")
        $("#new-tweet .counter").text('140')
      }
    })




    // $('#current-user').on('click', function(event) {
    //   Cookies.remove('email')
    //   console.log('two')
    //   event.stopPropagation()
    //   event.preventDefault()
    //   $.ajax({
    //       method: 'POST',
    //       url: '/logout',
    //   }).then(function (event) {
    //     removedLoggedInUserEnv()
    //     console.log('test')
    //     createLoginRegisterForm()
    //     createLoginRegisterButton()
    //     addListenersToLoginRegisterButtons()
    //     addListenersToLoginRegisterForm()
    //   })
    // })



        // Listen for clicks on the compose form and remove the error message if any
    $("#new-tweet").on('click', function() {
      $(".error").hide()
    })




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



}





// function addListenerToLogInButton() {
//   console.log("addListenerToLogInButton")
//     $('#login-form').on("submit",function (event) {
//     //
//     const email = $(this).serializeArray()[0].value
//     event.preventDefault()
//     event.stopPropagation()

//     $.ajax({
//         method: 'POST',
//         url: '/login',
//         data: $(this).serialize()
//     }).then(function () {
//     // Then, load all tweets
//     Cookies.set('email', email)
//     removedLoggedOutUserEnv()
//     createComposeLogOutForm()
//     createComposeLogOutButton()
//     addListenersToComposeLogoutButton()
//     addListenerToLogOutButton()

//     })
//   })


// }

