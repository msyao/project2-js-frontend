'use strict';

//hides modal after login action
let hideModal = function (){
  $('#sign-in-modal').modal('hide');
  $('#change-password-modal').modal('hide');
  $('#sign-up-modal').modal('hide');
};

let pageOnLoad = function (){
  $('.change-password-nav').hide();
  $('.create-tab').hide();
  $('.sign-out-nav').hide();
  $('.alert-success').hide();
};

let signOut = function (){
  $('.change-password-nav').hide();
  $('.sign-in-nav').show();
  $('.logged-in-button').hide();
  $('.sign-out-nav').hide();
  $('.sign-up-nav').show();
  $( '.user-email-login' ).hide();
  $( '.create-tab' ).hide();
};

let signIn = function () {
  $('.change-password-nav').show();
  $('.create-tab').show();
  $('.sign-in-nav').hide();
  $('.logged-in-button').show();
  $('.sign-out-nav').show();
  $('.sign-up-nav').hide();
};

module.exports = {
  pageOnLoad,
  hideModal,
  signIn,
  signOut
};
