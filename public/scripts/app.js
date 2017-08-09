/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {
  $('#add-tweet').on('submit', function (event) {
    event.preventDefault();
    if (validate($(this).serializeArray()[0].value)){
      $.ajax({
          method: 'POST',
          url: 'http://localhost:8080/tweets',
          data: $(this).serialize()
      }).then(function () {
          loadTweets()
      })
      $(this).trigger("reset");
    }
  })



  $("#add-tweet").on('click', function() {
    $(".new-tweet .error").remove()
  })


  $('#compose-button').on('click', function() {
    $(".new-tweet").slideToggle()
    $('.new-tweet textarea').focus()
  })



})


function validate (tweetText ) {

  let valid     = true
  let errorText = ""

  if (tweetText.length === 0) {
    errorText = "Your input field is empty."
  }
  else if (tweetText.length > 140) {
    errorText = "Your tweet is more than 140 characters."
  }

  if (errorText) {
    valid = false
    $error = $('<div>').addClass('error').text(errorText)
    $(".new-tweet .error").remove()
    $(".new-tweet").append($error)
  }

  return valid
}



loadTweets()
function loadTweets () {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:8080/tweets',
  }).then(function(response) {
      renderTweets(response)
  })

}



function renderTweets(tweets) {
  let tweetsContainer = $('#tweets-container')
  tweets.forEach(function(tweet) {
    let tweetsArticle = createTweetElement(tweet)
    tweetsContainer.prepend(tweetsArticle)
  })

}


function createTweetElement(tweet) {

  let $article = $("<article>")
  let $header  = $("<header>")
  let $main    = $("<main>")
  let $footer  = $("<footer>")

  $article.addClass("tweet")

  $header.append(`<img src='${tweet.user.avatars.small}'>`)
  $header.append($("<div>").addClass("name").append(tweet.user.name))
  $header.append($("<div>").addClass("handle").append(tweet.user.handle))

  $main.addClass('tweet')
  $main.text(tweet.content.text)

  let $time    = $("<span>").addClass("time").append("time")
  let $symbols = $("<span>").addClass("symbols")
  $symbols.append("<i class='fa fa-flag' aria-hidden='true'></i>")
  $symbols.append("<i class='fa fa-retweet' aria-hidden='true'></i>")
  $symbols.append("<i class='fa fa-heart' aria-hidden='true'></i>")
  $footer.append(timeStamp(Date.now(),tweet.created_at)).append($symbols)

  $tweet = $article.append($header).append($main).append($footer)

  return $tweet

}


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



















