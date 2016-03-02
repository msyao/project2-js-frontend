'use strict';
// user require with a reference to bundle the file and use it in this file
// var example = require('./example');
// use require without a reference to ensure a file is bundled
require('./example');
const apiAuth = require('./api-auth'); //login
const articleCrud = require('./articles-crud');  //front end crud

//display content in home tab
let displayHome = function(){
  console.log('displayHome works');
  $('.content').html();
};

//display articles in articles tab
let displayArticles = function(response){
  console.log('displayArticles works');
  let articles = response.articles;
  let articleListingTemplate = require('./article-listing.handlebars');
  $('.content').html(articleListingTemplate({articles}));
};

//get articles in articles tab
let getArticles = function(){
  $.ajax({
    url: apiAuth.myApp.baseUrl + '/articles/',
    method: 'GET',
    dataType: 'json'
  }).done(function(articles){
    displayArticles(articles);
    console.log(articles);
  });
};


//clear content on page
let clear = function(){
  $('.content').empty();
};

//CRUD Edit
//Update on click of handlebars button calls getArticleId function
$('.content').on('click', '.edit-article', articleCrud.getArticleId);
$('#edit-article').on('submit', function(e) {
  articleCrud.editArticle(e, articleCrud.articleID);
});

$(document).ready(function(){
  $('.articles-tab').on('click',function(){
    getArticles();
    $('.hero-unit').hide();
  });
  $('.home-tab').on('click',function(){
    clear();
    $('.hero-unit').show();
    displayHome();
  });
  $(window).scroll(function (){
    if ($(this).scrollTop() > 100) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
  });

  $('.scrollup').click(function () {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
    return false;
  });
});
