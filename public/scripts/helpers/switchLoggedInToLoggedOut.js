/*
* This file includs all the function that are needed to switch the frontend from
* the LOGGED IN state to the LOGGED OUT state
*
*     - FIRST STEP:   Remove all DOM elements specific to logged in state:
*                          * compose new tweet form
*                          * compose and logout buttons
*
*     - SECOND STEP:  Create all DOM elements specific to logged out state
*                          * login button
*                          * registration button
*                          * login form
*                          * registration form
*
*     - THIRD STEP:   Add Listeners to all newly created DOM elements:
*                          * Add listener to login button
*                          * Add listener to registration button
*                          * Add listener to login form
*                          * Add listener to registration form
*
*     - FORTH STEP:   Remove Listeners of like buttons
*/




// FIRST STEP //

// Removes the following DOM elements when user logs out:
//     - compose new tweet forms
//     - compose and logout buttons in the nav-bar
function removeLoggedInUserEnv(){
    $('#compose').html('')
    $('#compose-button').remove()
    $('#logout-button').remove()
}





// SECOND STEP //

// Create log in button
function createLoginButton(){
  $('#nav-bar')
  .append($('<button>')
    .attr("id","login-button").attr("type","submit")
    .append($("<i>")
      .addClass("fa").addClass("fa-sign-in").attr("aria-hidden",true)
      )
    .append("Sign In")
    )
}
// Create registeration button
function createRegisterationButton(){
  $('#nav-bar')
  .append($('<button>')
    .attr("id","register-button").attr("type","submit")
    .append($("<i>")
      .addClass("fa").addClass("fa-user-plus").attr("aria-hidden",true)
      )
    .append("Sign Up")
    )
}

// Create login form
function createLoginForm() {
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
  // Hide it first (user can slide it down later)
  $('#login').hide()
}
// Create registeration form
function createRegisterationForm() {
  $("#log")
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
          .attr('type', 'submit').attr("id","register-form-button")
          .append($("<i>").addClass("fa").addClass("fa-user-plus")
            .attr("aria-hidden",true)
            )
          .append('Sign Up')
          )
        )
      )
  // Hide it first (user can slide it down later)
  $('#register').hide()
}





// THIRD STEP //

// Add listener to log in button
function addListenerToLoginButton() {
  $('#login-button').on('click', function() {
    $('#register').slideUp()
    $("#login").slideToggle()
  })
}

// Add listener to register button
function addListenerToRegisterButton() {
  $('#register-button').on('click', function() {
    $('#login').slideUp()
    $("#register").slideToggle()
  })
}
// Add listener to login form after it is created
//     - Listen for any form submission
//     - Listen for any click on the form and remove the error (if any)
function addListenersToLoginForm() {
  // Listen for form submission and send an ajax call
  $('form#login-form').on('submit', function(event) {
      const email = $('#login-form').serializeArray()[0].value
      event.preventDefault()
      event.stopPropagation()
      let error = validateLogin($('#login-form').serializeArray())
      if (error) {
        $('#login .error').remove()
        $('#login').append($('<div>').addClass('error').text(error))
      }
      else {
        $.ajax({
          method: 'POST',
          url: '/login',
          data: $('#login-form').serialize()
        }).then(function (error) {
          if (error) {
            $('#login .error').remove()
            $('#login').append($('<div>').addClass('error').text(error))
          }
          else {
            Cookies.set('email', email)
            removeLoggedOutUserEnv()

            createComposeButton()
            createLogoutButton()
            createComposeForm()

            addListenerToComposeButton()
            addListenerToLogoutButton()
            addListenersToComposeForm()
            addListenersToLikes()
          }
        })
      }
    })
  // Listen for clicks on the form and remove error (if any)
  $("section#login").on('click', function() {
    $(".error").hide()
  })
}
// Add Listener to registration form after it is created
//     - Listen for any form submission
//     - Listen for any click on the form and remove the error (if any)
function addListenersToRegisterationForm() {
  // Listen for form submission and make an ajax call
  $('form#register-form').on('click', '#register-form-button', function(event) {
    const email = $('#register-form').serializeArray()[0].value
    event.preventDefault()
    event.stopPropagation()
    let error = validateRegisteration($('#register-form').serializeArray())
    if (error) {
      $('#register .error').remove()
      $('#register').append($('<div>').addClass('error').text(error))
    }
    else {
      $.ajax({
        method: 'POST',
        url: '/register',
        data: $('#register-form').serialize()
      }).then(function (err) {
        if (err) {
          $('#register .error').remove()
          $('#register').append($('<div>').addClass('error').text(err))
        }
        else {
          Cookies.set('email', email)
          removeLoggedOutUserEnv()

          createComposeButton()
          createLogoutButton()
          createComposeForm()

          addListenerToComposeButton()
          addListenerToLogoutButton()
          addListenersToComposeForm()
          addListenersToLikes()
        }
      })
    }
  })
  // Listen for any clicks on the form and remove error (if any)
  $("section#register").on('click', function() {
    $(".error").hide()
  })
}




// FORTH STEP //

// Removes listener to like buttons
// The logged out users are not able to like tweets
function removeListenersOfLikes() {
  $("#tweets-container").off("click", "i.fa-heart")
}




