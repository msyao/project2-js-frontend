'use strict';
const apiAuth = require('./api-auth'); //login baseUrl

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
     data:formData
   })
   .done(function(data){
     console.log(data);
   })
   .fail(function(jqxhr) {
     console.error(jqxhr);
   });
 };


 // $('#edit-article').on('submit', function(e) {
 //   console.log("editing article");
 //   e.preventDefault();
 //   let updateArticle = function(title, author, body) {
 //   $.ajax({
 //     url: myApp.baseUrl + '/articles/' + myApp.article.id,
 //     method: 'PATCH',
 //     headers: {
 //       Authorization: 'Token token=' + myApp.user.token,
 //     },
 //    //  contentType: false,
 //    //  processData: false,
 //     data: {
 //       "article": {
 //         "title":title,
 //         "author":author,
 //         "body":body,
 //       }
 //     }
 //   }).done(function(data) {
 //     // myApp.article = data.article;
 //     console.log(data);
 //   }).fail(function(jqxhr) {
 //     console.error(jqxhr);
 //     alert('Uh Oh');
 //   });
 // });
 // }





$(document).ready(() => {

});

module.exports = {
 createArticle
};
