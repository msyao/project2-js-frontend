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

let articleId;
let getArticleId = function(e){
  articleId = $(e.target).attr('data-d');
  console.log(articleId);
};

let editArticle = function(e, i){
  e.preventDefault();
  let article = new FormData(e.target);
  $.ajax({
    url: apiAuth.myApp.baseUrl + '/articles/' + i,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + apiAuth.myApp.user.token,
    },
    contentType: false,
    processData: false,
    data: article
  }).done(function(data) {
    console.log(data);
    apiAuth.getArticles();
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};






$(document).ready(() => {

});

module.exports = {
  createArticle,
  editArticle
};
