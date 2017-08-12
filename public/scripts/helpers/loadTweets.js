

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
            .addClass((tweet.like.indexOf(Cookies.get('email')) !== -1 ? "liked": ""))
            .attr("aria-hidden",true).data("_id",tweet._id).data("owner",tweet.user.email)
            )
          .append($('<span>').attr('id',"like-counter").addClass('light')
            .append(tweet.like.length)
            )
          )
    )

  return $tweet

}
