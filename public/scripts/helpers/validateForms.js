/*
* This file contains all functions that validate followin form inputs
*     - New Tweet:
*         * New tweet text should be between 1 and 140 characters
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



function validateNewTweetText (tweetText) {

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

  // return whether the form data was valid or not
  return valid
}


function validateRegisteration(data) {

  let err = ""
  // Check if any of the fields are empty
  for (let i = 0; i < 4; i++){
    if (!data[i].value.length) {
      return 'All fields are mandatory.'
    }
  }
  // Check if the handle field starts with an @ sign
  if (data[3].value.substring(0,1) !== '@') {
    return 'Handle should start with @ sign.'
  }

  // Check if the email field has an @ inside it
  if (!data[0].value.match(/\S+@/)){
    return 'Please provide a valid email address.'
  }
  // Return empty string if all fields are valid
  return err
}



function validateLogin(data) {
  let err = ""
  // Check if any of the login fields are empty
  for (let i = 0; i < 2; i++){
    if (!data[i].value.length) {
      return 'All fields are mandatory.'
    }
  }
  // Return empty string if all fields are valid
  return err
}



