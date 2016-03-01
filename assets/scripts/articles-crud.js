'use strict';
const apiAuth = require('./api-auth'); // to use for login baseUrl
const indexJs = require('./index');


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
    console.log('Edit Article Works');
    console.log(data);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};


// Delete articles
// URL can only get article id from e.target vs articleId variable in edit
$('.content').on('click', '.delete-article', function(e) {
  e.preventDefault();
  alert('Are you sure you want to delete?');
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
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
});


$(document).ready(() => {

});

module.exports = {
  editArticle,
  getArticleId,
};
