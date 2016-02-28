'use strict';

//const below lets you edit the home url in one place instead of inside each form. You can use as part of a path to change values
//This script works with index.html
const myApp = {
  baseUrl: 'http://localhost:3000',
};
$(document).ready(() => {
    $('.signed-out').show();
    $('.signed-in').hide();
    $('#sign-up').on('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(e.target);
      $.ajax({
        url: myApp.BASE_URL + '/sign-up',
        method: 'POST',
        contentType: false,
        processData: false,
        data: formData,
      }).done(function(data) {
        console.log(data);
        signIn(e);
        $('#sign-up-modal').modal('hide');
      }).fail(function(jqxhr) {
        console.error(jqxhr);
      });
    });

    let signIn = function(e){
      e.preventDefault();
      var formData = new FormData(e.target);
      $.ajax({
        url: myApp.BASE_URL + '/sign-in',
        method: 'POST',
        contentType: false,
        processData: false,
        data: formData,
      }).done(function(data) {
        console.log(data);
        myApp.user = data.user;
        console.log(myApp.user);
        $('.signed-out').hide();
        $('.signed-in').show();
        $('#sign-in-modal').modal('hide');
      }).fail(function(jqxhr) {
        console.error(jqxhr);
      });
    };

    //Login as existing user
    $('#sign-in').on('submit', function(e) {
      e.preventDefault();
      signIn(e);
    });

    //Change password of currently logged-in user
    $('#change-password').on('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(e.target);
      $.ajax({
        url: myApp.BASE_URL + '/change-password/' + myApp.user.id,
        method: 'PATCH',
        headers: {
          Authorization: 'Token token=' + myApp.user.token,
        },
        contentType: false,
        processData: false,
        data: formData,
      }).done(function(data) {
        console.log(data);
        $('#change-password-modal').modal('hide');
      }).fail(function(jqxhr) {
        console.error(jqxhr);
      });
    });

    $('#sign-out-button').on('click', function(e) {
      e.preventDefault();
      $.ajax({
        url: myApp.BASE_URL + '/sign-out/' + myApp.user.id,
        method: 'DELETE',
        headers: {
          Authorization: 'Token token=' + myApp.user.token,
        },
      }).done(function() {
        console.log("Logged Out!");
        $('.signed-out').show();
        $('.signed-in').hide();
      }).fail(function(jqxhr) {
        console.error(jqxhr);
      });
    });
  });
