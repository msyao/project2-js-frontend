'use strict';
// user require with a reference to bundle the file and use it in this file
// var example = require('./example');
// use require without a reference to ensure a file is bundled
require('./example');
require('./api-auth'); //login
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
    url: "http://localhost:3000/articles",
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

//CRUD submit actions
$('#create-article').on('submit', articleCrud.createArticle);
// $('#edit-article').on('submit', articleCrud.editArticle);

// $('.content').on('click', '.edit-article', $(e.target).attr('data-edit-id'));
// $('#edit-article').on('submit', function(e) {
//   articleCrud.editArticle(e);
// });


$('.content').on('click', '.edit-article', articleCrud.getArticleId);
$('#edit-article').on('submit', function(e) {
  articleCrud.editArticle(e, articleCrud.articleID);
});

//$('.content').on('click', '.delete-article', articleCrud.deleteArticle);


$(document).ready(function(){
  $('.articles-tab').on('click',function(){
    getArticles();
  });
  $('.home-tab').on('click',function(){
    clear();
    displayHome();
  });
});
