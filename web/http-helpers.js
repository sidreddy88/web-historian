var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};


exports.sendResponse = function(response, obj, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(obj);
};

exports.collectData = function(request, callback){
  var data = "";
  request.on("data", function(chunk){
    data += chunk;
  });
  request.on("end", function(){
    callback(data);
  });
};

exports.send404 = function(response){
  exports.sendResponse(response, '404: Page not found', 404);
};

exports.serveAssets = function(res, asset, callback) {
  var encoding = {encoding: 'utf8'};

  // 1. check in public folder
  fs.readFile( archive.paths.siteAssets + asset, encoding, function(err, data){
    if(err){
      // 2. file doesn't exist in public, check archive folder
      fs.readFile( archive.paths.archivedSites + asset, encoding, function(err, data){
        if(err){
          // 3. file doesn't exist in either location
          callback ? callback() : exports.send404(res);
        } else {
          // file exists, serve it
          exports.sendResponse(res, data);
        }
      });
    } else {
      // file exists, serve it
      exports.sendResponse(res, data);
    }
  });
};



// As you progress, keep thinking about what helper functions you can put here!
