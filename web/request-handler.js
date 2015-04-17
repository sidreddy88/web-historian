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
    
  },
   
};

exports.handleRequest = function(request, response) {
  var action = actions[request.method];
  if( action ){
    action(request, response);
  } else {
    utils.sendResponse(response, "Not Found", 404);
  }
};


