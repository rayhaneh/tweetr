/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

let currentUser

// Add event listener
$(document).ready(function() {

  // Load All Tweets First
  loadTweets()
  let currentUser = Cookies.get('email')
  // Check if the user is logged in using js-cookie
  if (Cookies.get('email')){
    // If logged in created compose form
    removedLoggedOutUserEnv()
    createComposeLogOutForm()
    createComposeLogOutButton()
    addListenersToComposeLogoutButton()
    addListenerToComposeLogoutForm()
    addListenerToLikes()
    // If logged out create login/register form
  } else {
    removedLoggedInUserEnv()
    createLoginRegisterForm()
    createLoginRegisterButton()
    addListenersToLoginRegisterButtons()
    addListenersToLoginRegisterForm()
  }


})







// Validate the compose form input (tweet text length)
function validate (tweetText ) {

  let valid     = true
  let errorText = ""

  // Check if the tweet text length is 0 or more than 140 and set and error message
  if (tweetText.length === 0) {
    errorText = "Your input field is empty."
  }
  else if (tweetText.length > 140) {
    errorText = "Your tweet is more than 140 characters."
  }

  // Add the error message div to the DOM if there is any error
  if (errorText) {
    valid = false
    $error = $('<div>').addClass('error').text(errorText)
    $("#new-tweet .error").remove()
    $("#new-tweet").append($error)
  }

  // return if the form data was valid or not
  return valid
}








// FUNCTIONS

// FUNCTION: Loads tweets by sending a GET request to /tweets
function loadTweets () {
  $.ajax({
    method: 'GET',
    url: '/tweets',
  }).then(function(response) {
      renderTweets(response)
  })
}


// FUNCTION: Renders all the tweets in the database and adds them to the DOM (one by one)
function renderTweets(tweets) {
  let tweetsContainer = $('#tweets-container')
  tweets.forEach(function(tweet) {
    let tweetsArticle = createTweetElement(tweet)
    tweetsContainer.prepend(tweetsArticle)
  })

}


// FUNCTION: Create a tweet element (to be added to the DOM by renderTweets)
function createTweetElement(tweet) {

  const time = timeStamp(Date.now(),tweet.created_at)

  let $tweet = $("<article>").addClass("tweet")
  .append($("<header>")
        .append(`<img src='${tweet.user.avatars.small}'>`)
        .append($("<div>").addClass("name").text(tweet.user.name))
        .append($("<div>").addClass("handle").text(tweet.user.handle))
    )
  .append($("<main>").addClass('tweet')
        .text(tweet.content.text)
    )
  .append($("<footer>")
        .append($("<span>").addClass("time").text(time))
        .append($("<span>").addClass("symbols")
          .append($("<i>").addClass("fa").addClass("fa-flag")
            .attr("aria-hidden",true)
            )
          .append($("<i>").addClass("fa").addClass("fa-retweet")
            .attr("aria-hidden",true)
            )
          .append($("<i>").addClass("fa").addClass("fa-heart")
            .addClass((tweet.like === true ? "liked": ""))
            .attr("aria-hidden",true).data("_id",tweet._id)
            )
          )
    )

  return $tweet

}


function removedLoggedOutUserEnv(){
    $('#log').html('')
    $('#login-button').remove()
    $('#register-button').remove()
}


function createComposeLogOutForm() {
  $('#compose')
    .prepend($('<section>').attr("id","new-tweet")
    .append($('<h2>').text('Compose Tweet'))
    .append($("<form>").attr("id","add-tweet-form").attr("action","/tweets").attr("method","POST")
      .append($("<textarea>").attr("name","text").attr("placeholder","What are you humming about?"))
      .append($("<input>").attr("type","submit").attr("value","tweet"))
      .append($("<span>").attr("class","counter").text('140'))
      )
    )
  $('#current-user')
    .append($('<button>').attr("id","logout-form-button").attr("type","button").text('Logout'))
}


function addListenersToLoginRegisterForm() {
  $('form#login-form').on('click', '#login-form-button', function(event) {
      const email = $('#login-form').serializeArray()[0].value
      event.preventDefault()
      event.stopPropagation()
      $.ajax({
        method: 'POST',
        url: '/login',
        data: $('#login-form').serialize()
      }).then(function () {
        Cookies.set('email', email)
        removedLoggedOutUserEnv()
        createComposeLogOutForm()
        createComposeLogOutButton()
        addListenersToComposeLogoutButton()
        addListenerToComposeLogoutForm()
        addListenerToLikes()
      })
    });


  $('form#register-form').on('click', '#register-form-button', function(event) {
    const email = $('#register-form').serializeArray()[0].value
    event.preventDefault()
    event.stopPropagation()
    $.ajax({
      method: 'POST',
      url: '/register',
      data: $('#register-form').serialize()
    }).then(function () {
      console.log()
      Cookies.set('email', email)
      removedLoggedOutUserEnv()
      createComposeLogOutForm()
      createComposeLogOutButton()
      addListenersToComposeLogoutButton()
      addListenerToComposeLogoutForm()
      addListenerToLikes()
    })
  })
}


function addListenersToLoginRegisterButtons() {
  $('#login-button').on('click', function() {
    $("#log").slideToggle()
  })
  $('#register-button').on('click', function() {
    $("#log").slideToggle()
  })
}


function addListenerToLikes() {
  // Listen for clicks on like button
  $("#tweets-container").on("click", "i.fa-heart", function() {
    const _id = $(this).data("_id")
    const elm = $(this)
    $.ajax({
        method: 'PUT',
        url: `/tweets/${_id}/like`,
    }).then(function () {
    // Then, toggle the liked class
        elm.toggleClass("liked")
    })
  })
}

























function removedLoggedInUserEnv(){
    $('#compose').html('')
    $('#current-user').html('')
    $('#compose-button').remove()
    $('#logout-button').remove()
}


function createLoginRegisterForm() {
  console.log('createLoginRegisterForm')
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
  console.log('createComposeLogOutButton')
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
  console.log('fasdffs')
    // Listen for click on the compose button and slide it up/down
    $('#compose-button').on('click', function() {
      $("#new-tweet").slideToggle()
      $('#new-tweet textarea').focus()
    })

    $('#logout-button').on('click', function() {
      // $("#new-tweet").slideToggle()
      console.log('second')
      Cookies.remove('email')
      removedLoggedInUserEnv()
      createLoginRegisterButton()
      createLoginRegisterForm()
      addListenersToLoginRegisterButtons()
      addListenersToLoginRegisterForm()
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
      if (validate($(this).serializeArray()[0].value)){
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



// FUNCTION: Creates a timestamp for each tweet
function timeStamp(now, createTime) {

  let milliseconds = now - createTime

  let days    = Math.floor(milliseconds / 86400000)
  let hours   = Math.floor(milliseconds / 3600000)
  let minutes = Math.floor(milliseconds / 60000)
  let seconds = Math.floor(milliseconds / 1000)

  if (days > 7) {
    return new Date(createTime).toDateString().substring(4,16)
  }
  else if (days === 7) {
    return `A week ago`
  }
  else if (days > 0) {
    return `${days} day${(days === 1 ? '' : 's')} ago`
  }
  else if (hours > 0) {
    return `${hours} hour${(hours === 1 ? '' : 's')} ago`
  }
  else if (minutes > 1) {
    return `${minutes} minute${(minutes === 1 ? '' : 's')} ago`
  }
  else {
    return `Just now`
  }

}







