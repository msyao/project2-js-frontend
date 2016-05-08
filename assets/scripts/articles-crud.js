'use strict';
const apiAuth = require('./api-auth'); // to use for login baseUrl
const indexJs = require('./index');
const uiDisplay = require('./ui-display'); // ui display


let displayArticles = function(response) {
  console.log('displayArticles works');
  let articles = response.articles;
  let articleListingTemplate = require('./templates/article-listing.handlebars');
  $('.content').html(articleListingTemplate({
    articles
  }));
  if (apiAuth.myApp.user) {
    $('.logged-in-button').show();
  }
};

//get articles in articles tab
let getArticles = function() {
  $.ajax({
    url: apiAuth.myApp.baseUrl + '/articles/',
    method: 'GET',
    dataType: 'json'
  }).done(function(articles) {
    displayArticles(articles);
    console.log(articles);
    console.log('get articles');
  });
};

// ******************    Crud actions ***********************

// Create Article from tab after sign-in
$('#create-article').on('submit', indexJs.getArticles, function(e) {
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
    uiDisplay.hideModal();
    getArticles();
  })
  .fail(function(jqxhr) {
    console.error(jqxhr);
  });
});

// Get the article id from handlebars
let articleId; //global variable
let getArticleId = function(e) {
  articleId = $(e.target).attr('data-id');
  console.log('Article ID is',articleId);
};

// Edit and update article
let editArticle = function(e) {
  e.preventDefault();
  if (!apiAuth.myApp.user) {
    console.error('Must log in to make changes!');
    return;
  }
  $.ajax({
    url: apiAuth.myApp.baseUrl + '/articles/' + articleId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + apiAuth.myApp.user.token,
    },
    contentType: false,
    processData: false,
    data: new FormData(e.target)
  }).done(function(data) {
    console.log(data);
    uiDisplay.hideModal();
    getArticles();
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

// Populate update modal with text
let fillUpdate = function(response) {
  let article = response.articles;
  console.log(article);
  $('#edit-title').val(article.title);
  $('#edit-author').val(article.author);
  $('#edit-body').val(article.body);
};

// Delete articles
$('.content').on('click', '.delete-article-button', function(e) {
  e.preventDefault();
  console.log('Delete Button Works');
  if (!apiAuth.myApp.user) {
    console.error('Must log in to make changes!');
    return;
  }
  $.ajax({
    url: apiAuth.myApp.baseUrl + '/articles/' + $(e.target).attr('data-id'),
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + apiAuth.myApp.user.token,
    },
  }).done(function(data) {
    console.log(data);
    getArticles();
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
});


$(document).on('click','.edit-article-button', function(){
  $('#edit-article-modal').modal('show');
  $.ajax({
    url: apiAuth.myApp.baseUrl + '/articles/' + articleId,
    method: 'GET',
    dataType: 'json'
  }).done(function(article){
    fillUpdate(article);
  });
});

module.exports = {
  editArticle,
  getArticleId,
  getArticles
  // deleteArticle
};
