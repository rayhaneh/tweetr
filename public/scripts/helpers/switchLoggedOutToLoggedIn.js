/*
* This file includs all the function that are needed to switch the frontend from
* the LOGGED OUT state to the LOGGED IN state
*
*     - FIRST STEP:   Remove all DOM elements specific to logged out state:
*                          * login and register forms
*                          * login and register buttons
*
*     - SECOND STEP:  Create all DOM elements specific to logged in state
*                          * compose button
*                          * logout button
*                          * compose form
*
*     - THIRD STEP:   Add Listeners to all newly created DOM elements:
*                          * Add listener to compose button
*                          * Add listener to logout button
*                          * Add listener to compose form
*
*     - FORTH STEP:   Add Listeners to like buttons
*
*/




// FIRST STEP //

// Removes the following DOM elements when user logs in:
//     - login and register forms
//     - login and register buttons in the nav-bar
function removeLoggedOutUserEnv(){
    $('#log').html('')
    $('#login-button').remove()
    $('#register-button').remove()
}





// SECOND STEP //

// Creates the compose button
function createComposeButton() {
  $('#nav-bar')
  .append($('<button>')
    .attr('id','compose-button').attr('type','submit')
    .append($('<i>')
      .addClass('fa').addClass('fa-pencil-square-o').attr('aria-hidden',true)
      )
    .append('Compose')
    )
}
// Creates the compose button
function createLogoutButton() {
  $('#nav-bar')
  .append($('<button>')
    .attr('id','logout-button').attr('type','submit')
    .append($('<i>')
      .addClass('fa').addClass('fa-sign-out').attr('aria-hidden',true)
      )
    .append('Sign Out')
    )
}
// Creates the compose form
function createComposeForm() {
  $('#compose')
    .prepend($('<section>').attr('id','new-tweet')
    .append($('<h2>').text('Compose Tweet'))
    .append($('<form>').attr('id','add-tweet-form').attr('action','/tweets').attr('method','POST')
      .append($('<textarea>').attr('name','text').attr('placeholder','What are you humming about?'))
      .append($('<input>').attr('type','submit').attr('value','tweet'))
      .append($('<span>').attr('class','counter').text('140'))
      )
    )
}





// THIRD STEP //


// Addes listener to compose button
function addListenerToComposeButton() {
  // Listen for click on the compose button and slide it up/down
  $('#compose-button').on('click', function() {
    $('#new-tweet').slideToggle()
    $('#new-tweet textarea').focus()
  })
}
// Addes listener to logout button
function addListenerToLogoutButton() {
  // Listen for click on the compose button and slide it up/down
  $('#logout-button').on('click', function() {
    // When logout button is clicked:
    // Switch the frontend from logged in state to logged out state
    // by calling all the fuction in switchLoggedinToLoggedOut.js

    //      - Log user out by removing the cookie
    Cookies.remove('email')
    //    - remove all DOM elemnts specific to logged in state
    removeLoggedInUserEnv()

    // Load tweets again
    // This removes  'liked' class from tweets liked by the current user
    loadTweets()

    //    - create login/register buttons and forms
    createLoginButton()
    createRegisterationButton()
    createLoginForm()
    createRegisterationForm()

    //    - Add listeners to above created elements
    addListenerToLoginButton()
    addListenerToRegisterButton()
    addListenersToLoginForm()
    addListenersToRegisterationForm()

    //    - Remove listeners to likes since logged out users cannot like tweets
    removeListenersOfLikes()

  })
}
// Add three listeners to compose form
//     - Listen for any form submission
//     - Listen for any click on the form and remove the error message if any
//     - Listen for changes in the textarea and change the character counter
function addListenersToComposeForm() {
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
      $(this).trigger('reset')
      $('#new-tweet .counter').text('140')
    }
  })

  // Listen for any click on the compose form and remove the error message if any
  $('#new-tweet').on('click', function() {
    $('.error').hide()
  })


  // Add Listener to compose form text area and change the character counter
  $('#new-tweet textarea').on('input',function (event) {
    let counterElm = $(this).closest('form').children('.counter')
    counter = 140 - $(this).val().length
    counterElm.text(counter)
    $('.error').hide()

    // Adding/removing the negative class to .counter
    // Checks if it already has that class to prevent re-adding!
    if (counter < 0 && !counterElm.hasClass('negative')) {
      counterElm.addClass('negative')
    }
    else if (counter >= 0 && counterElm.hasClass('negative')) {
      counterElm.removeClass('negative')
    }
  })

}





// FORTH STEP //

// Add listeners to like buttons
function addListenersToLikes() {
  // Listen for clicks on like button
  $('#tweets-container').on('click', 'i.fa-heart', function () {
    let currentUser = Cookies.get('email')
    if (currentUser) {
      if ($(this).data('owner') !== currentUser){
        let counterElm = $(this).siblings(('#like-counter'))
        let counter = Number(counterElm.text())
        if ($(this).hasClass('liked')) {
          counterElm.text(counter - 1)
        } else {
          counterElm.text(counter + 1)
        }
        //


        const _id = $(this).data('_id')
        const elm = $(this)
        $.ajax({
            method: 'PUT',
            url: `/tweets/${_id}/like`,
            data: {email: Cookies.get('email')}
        }).then(function () {
        // Then, toggle the liked class
            elm.toggleClass('liked')
        })

      }
    }
  })
}




