/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Load all tweets at the begining
loadTweets()

// Add event listener
$(document).ready(function() {

  // Listen for new tweet submission
  $('#add-tweet-form').on('submit', function (event) {

    // Prevent default behaviour of the compose-new-tweet form
    event.preventDefault();

    // Validate the form data
    if (validate($(this).serializeArray()[0].value)){
      // Post the new tweet
      $.ajax({
          method: 'POST',
          url: 'http://localhost:8080/tweets',
          data: $(this).serialize()
      }).then(function () {
      // Then, load all tweets
          loadTweets()
      })
      // Reset the form after submission
      $(this).trigger("reset");
    }
  })

  // Listen for clicks on the compose form and remove the error message if any
  $("#new-tweet").on('click', function() {
    $(".error").hide()
  })

  // Listen for click on the compose button and slide it up/down
  $('#compose-button').on('click', function() {
    $("#new-tweet").slideToggle()
    $('#new-tweet textarea').focus()
  })

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
          .append("<i class='fa fa-flag' aria-hidden='true'></i>")
          .append("<i class='fa fa-retweet' aria-hidden='true'></i>")
          .append("<i class='fa fa-heart' aria-hidden='true'></i>")
          )
    )

  return $tweet

}


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







