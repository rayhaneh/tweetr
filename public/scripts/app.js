/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweets = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
]



renderTweets(tweets)

function renderTweets(tweets) {
  let tweetsContainer = $('#tweets-container')
  tweets.forEach(function(tweet) {
    let tweetsArticle = createTweetElement(tweet)
    tweetsContainer.append(tweetsArticle)
  })

}


function createTweetElement(tweet) {

  let $tweet = $('<article>').addClass('tweet')

  let $header = $('<article>')
              .append("<img>").attr("src",tweet.user.avatars.small) // not sure if this works
              .append($("<div>").addClass("name").append(tweet.user.name))
              .append($("<div>").addClass("handle").append(tweet.user.handle))

  let $main = $('<main>').addClass('tweet').text(tweet.content.text)

  let $footer = $('<footer>')
                .append("<span>").addClass("time").append(timeStamp(Date.now(),tweet.created_at))
                .append("<span>").addClass("symbols")
                .append("<i class='fa fa-flag' aria-hidden='true'></i>")
                .append("<i class='fa fa-retweet' aria-hidden='true'></i>")
                .append("<i class='fa fa-heart' aria-hidden='true'></i>")

  $tweet = $tweet.append($header).append($main).append($footer)

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
  else if (minutes > 0) {
    return `${minutes} minute${(minutes === 1 ? '' : 's')} ago`
  }
  else {
    return `${seconds} second${(seconds === 1 ? '' : 's')} ago`
  }

}




