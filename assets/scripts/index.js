'use strict';
// user require with a reference to bundle the file and use it in this file
// var example = require('./example');
// use require without a reference to ensure a file is bundled
require('./example');
const apiAuth = require('./api-auth'); //login
const articleCrud = require('./articles-crud'); //front end crud
const uiDisplay = require('./ui-display'); // ui display

//display articles in articles tab
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
  });
};


//CRUD Edit --- Update on click of handlebars button calls getArticleId function
$('.content').on('click', '.edit-article-button', articleCrud.getArticleId);
$('#edit-article').on('submit', function(e) {
  articleCrud.editArticle(e);
  uiDisplay.hideModal();
});


$(document).ready(function() {
  $('.articles-tab').on('click', function() {
    getArticles();
    uiDisplay.articleTab();
  });
  $('.home-tab').on('click', function() {
    uiDisplay.homeTab();
  });
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
  });
  $('.scrollup').click(function() {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
    return false;
  });
});
