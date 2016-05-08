'use strict';
// user require with a reference to bundle the file and use it in this file
// var example = require('./example');
// use require without a reference to ensure a file is bundled
require('./example');
const apiAuth = require('./api-auth'); //login
const articleCrud = require('./articles-crud'); //front end crud
const uiDisplay = require('./ui-display'); // ui display



//CRUD Edit --- Update on click of handlebars button calls getArticleId function
$('.content').on('click', '.edit-article-button', articleCrud.getArticleId);
$('#edit-article').on('submit', function(e) {
  articleCrud.editArticle(e);
  uiDisplay.hideModal();
});

// twitter embed
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");


$(document).ready(function() {
  $('.articles-tab').on('click', function() {
    articleCrud.getArticles();
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
