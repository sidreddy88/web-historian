var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./http-helpers');
var urlParser = require('url');


var actions = {
  
  'GET': function(request, response){
  	var parts = urlParser.parse(request.url);
  	var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;
  	utils.serveAssets(response, urlPath);
  
  },

  'POST': function(request, response){
  	utils.collectData(request, function(data){
  	  var url= "www.walmart.com"
  	  console.log(data);
  	  archive.isUrlInList(url, function(found){
      if (found) {
      	 archive.isURLArchived(url, function(exists){ //if yes, is it archived
      	 	if (exists){
              // display site
                utils.sendRedirect(response, '/' + url);
      	 	} else {
             // if no, show loading page and archive page
               utils.sendRedirect(response, "/loading.html");
      	 	}

      	 });
      } else {
      	// if no, show loading page, add ti sites.txt and archive page
       	  archive.addUrlToList(url, function () {
             utils.sendRedirect(response, "/loading.html");
      	});
        }
      });
    });
  }
};

exports.handleRequest = function(request, response) {
  var action = actions[request.method];
  if( action ){
    action(request, response);
  } else {
    utils.sendResponse(response, "Not Found", 404);
  }
};


