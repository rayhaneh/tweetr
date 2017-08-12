/*
* Client-side JS
* Uses all the functions in ./helpers directory
*/


// Add event listener
$(document).ready(function() {
// When a user visits the website
  // 1 - First load all tweets
  loadTweets()
  // 2 - Get Cookie
  let currentUser = Cookies.get('email')
  // 3 - Check if the user is logged in
  if (currentUser){
    // If logged in (call all function in switchLoggedOutToLoggedIn.js):
    //   - create compose button, logout button, and compose from
    createComposeButton()
    createLogoutButton()
    createComposeForm()
    //   - add listeners to all the above-created DOM elements
    addListenerToComposeButton()
    addListenerToLogoutButton()
    addListenersToComposeForm()
    addListenersToLikes()

  } else {
    // If not logged in (call all function in switchLoggedInToLoggedOut.js):
    //   - create login button, register button, login form, and register form
    createLoginButton()
    createRegisterationButton()
    createLoginForm()
    createRegisterationForm()
    //   - add listeners to all above-created DOM elements
    addListenerToLoginButton()
    addListenerToRegisterButton()
    addListenersToLoginForm()
    addListenersToRegisterationForm()
    removeListenersOfLikes()
  }
})



