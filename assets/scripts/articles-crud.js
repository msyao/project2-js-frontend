'use strict';
const apiAuth = require('./api-auth'); // to use for login baseUrl

//Create new articles from logged in admin
let createArticle = function(e){
  e.preventDefault();
  let formData = new FormData(e.target);
  $.ajax({
    url: apiAuth.myApp.baseUrl + '/articles',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + apiAuth.myApp.user.token,
    },
    processData: false,
    contentType: false,
    data:formData
  })
  .done(function(data){
    console.log(data);
  })
  .fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

// let articleId;
// let getArticleId = function(e){
//   let articleId = $(e.target).attr('data-edit-id');
//   console.log(articleId);
// };
//
//
// let editArticle = function(e){
//   e.preventDefault();
//   console.log('edit working');
//   console.log(e.target);
//   let articleId = $(e.target).attr('data-edit-id');
//   console.log(articleId);
//   $.ajax({
//     url: apiAuth.myApp.baseUrl + '/articles/' + articleId,
//     method: 'PATCH',
//     headers: {
//       Authorization: 'Token token=' + apiAuth.myApp.user.token,
//     },
//     contentType: false,
//     processData: false,
//     data: new FormData(e.target)
//   }).done(function(data) {
//     console.log(data);
//   }).fail(function(jqxhr) {
//     console.error(jqxhr);
//   });
// };

let articleId;
let getArticleId = function(e) {
  articleId = $(e.target).attr('data-id');
  console.log('Article ID is',articleId);
};

let editArticle = function (e, i) {
  e.preventDefault();
  console.log('edit article button works');
  $.ajax({
    url: apiAuth.myApp.baseUrl + '/articles/' + i,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + apiAuth.myApp.user.token,
    },
    contentType: false,
    processData: false,
    data: new FormData(e.target)
  }).done(function(data) {
    console.log('edit article works');
    console.log(data);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

// let deleteArticle = function(e) {
//     console.log('delete button works');
//     e.preventDefault();
//     if (!apiAuth.myApp.user.user) {
//       console.error('Wrong!');
//       return;
//     }
//     $.ajax({
//       url: apiAuth.myApp.baseUrl + '/articles/' + $(e.target).attr('data-id'),
//       method: 'DELETE',
//       headers: {
//         Authorization: 'Token token=' + apiAuth.myApp.user.token,
//       },
//     }).done(function(data) {
//       console.log(data);
//     }).fail(function(jqxhr) {
//       console.error(jqxhr);
//     });
//   };






$(document).ready(() => {

});

module.exports = {
  createArticle,
  editArticle,
  getArticleId
};
