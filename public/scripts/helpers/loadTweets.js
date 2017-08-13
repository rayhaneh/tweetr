// Loads tweets by sending a GET request to /tweets
function loadTweets () {
  $('#tweets-container').html('')
  $.ajax({
    method: 'GET',
    url: '/tweets',
  }).then(function(response) {
      renderTweets(response)
  })
}


// Renders all the tweets in the database and adds them to the DOM (one by one)
function renderTweets(tweets) {
  let tweetsContainer = $('#tweets-container')
  tweets.forEach(function(tweet) {
    let tweetsArticle = createTweetElement(tweet)
    tweetsContainer.prepend(tweetsArticle)
  })

}


// Create a tweet element (to be added to the DOM by renderTweets)
function createTweetElement(tweet) {

  const time = timeStamp(Date.now(),tweet.created_at)

  let $tweet = $('<article>').addClass('tweet')
  .append($('<header>')
        .append(`<img src='${tweet.user.avatars.small}'>`)
        .append($('<div>').addClass('name').text(tweet.user.name))
        .append($('<div>').addClass('handle').text(tweet.user.handle))
    )
  .append($('<main>').addClass('tweet')
        .text(tweet.content.text)
    )
  .append($('<footer>')
        .append($('<span>').addClass('time').text(time))
        .append($('<span>').addClass('symbols')
          .append($('<i>').addClass('fa').addClass('fa-flag')
            .attr('aria-hidden',true)
            )
          .append($('<i>').addClass('fa').addClass('fa-retweet')
            .attr('aria-hidden',true)
            )
          .append($('<i>').addClass('fa').addClass('fa-heart')
            .addClass((tweet.like.indexOf(Cookies.get('email')) !== -1 ? 'liked': ''))
            .attr('aria-hidden',true).data('_id',tweet._id).data('owner',tweet.user.email)
            )
          .append($('<span>').attr('id','like-counter').addClass('light')
            .append(tweet.like.length)
            )
          )
    )
  console.log(Cookies.get('email'),tweet.like.indexOf(Cookies.get('email')))

  return $tweet
}


// Creates a timestamp for each tweet
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
