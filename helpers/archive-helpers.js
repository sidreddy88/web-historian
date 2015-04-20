var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
	fs.readFile(exports.paths.list, function(err, sites) {
    sites = sites.toString().split('\n');
    if( callback ){
      callback(sites);
    }
  });
  // fs.readFile('../archives/sites.txt', 'utf8', function (err,data) {
  // 	var sites = data.split(" ")
  //   if (err) {
  //   return console.log(err);
  //    } 
  //   if (callback) {
  //   	callback(sites);
  //   }
};

exports.isUrlInList = function(url, callback){
	  exports.readListOfUrls(function(sites) {
    var found = _.any(sites, function(site, i) {
      return site.match(url)
    });
    callback(found);
  });
// 	fs.readFile('../archives/sites.txt', 'utf8', function (err,data) {
//      var sites = data.split(" ")
//      if (err) {
//        return console.log(err);
//      } 
//      var found = false;
//      _any(sites, function (site) {
//      	if (site === url){
//           found = true;
//      	}
//      })
//      if (callback){
//      	callback(found);
//      }
// });

};

exports.addUrlToList = function(url){
	fs.appendFile(exports.paths.list, url+'\n', function(err, file){
    callback();
  });
  // fs.writeFile("sites.txt", url, function (err) {
  //   if (err) return console.log(err);
  //     console.log('Hello World > helloworld.txt');
  //  });


};

exports.isURLArchived = function(callback){
	var sitePath =  path.join(exports.paths.archivedSites, url);

  fs.exists(sitePath, function(exists) {
    callback(exists);
  });

};

exports.downloadUrls = function(){
	_.each(urls, function(url) {
    if(!url){ return; }
    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + "/" + url));
  });
  return true;
};
