'use strict';

//display content in home tab
let displayHome = function(){
  console.log('displayHome works');
  $('.content').html();
};

//clear content on page
let clearContent = function(){
  $('.content').empty();
};

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
  $('.sign-out-nav').hide();
  $('.sign-up-nav').show();
  $( '.user-email-login' ).hide();
  $( '.create-tab' ).hide();
  $('.logged-in-button').hide();
};

let signIn = function () {
  $('.change-password-nav').show();
  $('.logged-in-button').show();
  $('.create-tab').show();
  $('.logged-in-button').show();
  $('.sign-in-nav').hide();
  $('.sign-out-nav').show();
  $('.sign-up-nav').hide();
};

module.exports = {
  displayHome,
  clearContent,
  pageOnLoad,
  hideModal,
  signIn,
  signOut
};
