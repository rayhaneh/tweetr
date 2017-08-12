function validateRegisteration(data) {
  let err = ""
  for (let i = 0; i < 4; i++){
    if (!data[i].value.length) {
      return 'All fields are mandatory.'
    }
  }
  if (data[3].value.substring(0,1) !== '@') {
    return 'Handle should start with @ sign.'
  }
  if (!data[0].value.match(/\S+@/)){
    return 'Please provide a valid email address.'
  }
  return err
}


function validateLogin(data) {
  let err = ""
  for (let i = 0; i < 2; i++){
    if (!data[i].value.length) {
      return 'All fields are mandatory.'
    }
  }
  err
}


function validateNewTweetText (tweetText ) {

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
