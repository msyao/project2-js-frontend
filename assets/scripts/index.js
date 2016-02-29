'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');
require('./api-auth'); //login credentials



let displayHome = function(response){
  console.log('displayHome works');
  $('.content').html();
};



let getArticles = function(){
  $.ajax({
    url: "http://localhost:3000/articles",
    method: 'GET',
    dataType: 'json'
  }).done(function(articles){
    displayArticles(articles);
    console.log(articles);
  });
};

let displayArticles = function(response){
  console.log('displayArticles works');
  let articles = response.articles;
  let articleListingTemplate = require('./article-listing.handlebars');
  $('.content').html(articleListingTemplate({articles}));
};

let clear = function(){
 $('.content').empty();
}


$(document).ready(function(){
  $('.articles-tab').on('click',function(){
    getArticles();
  });
  $('.home-tab').on('click',function(){
    clear();
    displayHome();
  });
});
