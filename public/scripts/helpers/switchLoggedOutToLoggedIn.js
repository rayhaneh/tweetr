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
}




function addListenersToLoginRegisterForm() {
  $('form#login-form').on('click', '#login-form-button', function(event) {
      const email = $('#login-form').serializeArray()[0].value
      event.preventDefault()
      event.stopPropagation()
      let error = validateLogin($('#login-form').serializeArray())
      if (error) {
        $('#login .error').remove()
        $('#login').append($('<div>').addClass('error').text(error))
      }
      else {
        $.ajax({
          method: 'POST',
          url: '/login',
          data: $('#login-form').serialize()
        }).then(function (error) {
          if (error) {
            $('#login .error').remove()
            $('#login').append($('<div>').addClass('error').text(error))
          }
          else {
            Cookies.set('email', email)
            removedLoggedOutUserEnv()
            createComposeLogOutForm()
            createComposeLogOutButton()
            addListenersToComposeLogoutButton()
            addListenerToComposeLogoutForm()
            addListenerToLikes()
          }
        })
      }
    });


  $('form#register-form').on('click', '#register-form-button', function(event) {
    const email = $('#register-form').serializeArray()[0].value
    event.preventDefault()
    event.stopPropagation()
    let error = validateRegisteration($('#register-form').serializeArray())
    if (error) {
      $('#register .error').remove()
      $('#register').append($('<div>').addClass('error').text(error))
    }
    else {
      $.ajax({
        method: 'POST',
        url: '/register',
        data: $('#register-form').serialize()
      }).then(function (err) {
        if (err) {
          $('#register .error').remove()
          $('#register').append($('<div>').addClass('error').text(err))
        }
        else {
          Cookies.set('email', email)
          removedLoggedOutUserEnv()
          createComposeLogOutForm()
          createComposeLogOutButton()
          addListenersToComposeLogoutButton()
          addListenerToComposeLogoutForm()
          addListenerToLikes()
        }
      })
    }
  })

  $("section#register").on('click', function() {
    $(".error").hide()
  })


  $("section#login").on('click', function() {
    $(".error").hide()
  })

}















function addListenersToLoginRegisterButtons() {
  $('#login-button').on('click', function() {
    $("#login").slideDown()
    $('#register').slideUp()
  })
  $('#register-button').on('click', function() {
    // $("#log").slideToggle()
    $("#login").slideUp()
    $('#register').slideDown()
  })
}