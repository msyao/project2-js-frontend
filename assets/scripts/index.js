'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');
require('./api-auth'); //login credentials



let getArticles = function(){
 $.ajax({
   url: "http://localhost:3000/articles",
   method: 'GET',
   dataType: 'json'
 }).done(function(articles){
  //  displayBooks(articles);
   console.log(articles);
 });
};

// let displayArticles = function(articles){
//  let articleListingTemplate = require('./article-listing.handlebars');
//  $('.content').append(articleListingTemplate({articles}));
//    getUsers();
//  });
//
// };


let clear = function(){
 $('.content').empty();
}

$(document).ready(function(){
// getArticles();
});
