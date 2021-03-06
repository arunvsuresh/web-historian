var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var helpers = require('../web/http-helpers');
var sitesPath = "/Users/student/Desktop/2014-12-web-historian/web/archives/sites/"
var http = require('http-request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../web/archives/sites'),
  'list' : path.join(__dirname, '../web/archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(url, res){
  fs.readFile(exports.paths['list'], 'UTF-8', function(err, data){
    if (err) throw err;

    // storage that holds all urls
    var storage = data.split('\n');
    var lastItem = storage.pop();

    if(!exports.isUrlInList(storage, url)) {
      exports.addUrlToList(url, res);
    } else { // URL is in site.txt
      if(exports.isURLArchived(url)) {
        // serveAssets
        helpers.serveAssets(res, url);
      } else {
        loadHTML(res);
      }
    }


  });
};

exports.isUrlInList = function(urlStorage, url){
  for(var i = 0; i < urlStorage.length; i++) {
    if(urlStorage[i] === url) {
      return true;
    }
  }

  return false;

};

exports.addUrlToList = function(url, res){
    fs.appendFile(exports.paths['list'], url +'\n', function(err) {
      if(err) throw err;
    })
    loadHTML(res);
};

exports.isURLArchived = function(url){
  var urlPath = exports.paths['archivedSites'] + "/" + url + ".html";
  if(fs.existsSync(urlPath)) {
    return true;
  } else {
    return false;
  }

};

exports.downloadUrls = function(urlToDownload){
  http.get({
          url: 'http://' + urlToDownload,
          progress: function (current, total) {
            console.log('downloaded %d bytes from %d', current, total);
          }
        }, sitesPath + urlToDownload + ".html", function (err, res) {
          if (err) {
            console.error(err);
            return;
          }
          console.log(res.code, res.headers, res.file);
        });

};

var loadHTML = function(res) {
  fs.readFile(exports.paths['siteAssets'] + '/loading.html', 'UTF-8', function(err, data){
        if (err) throw err;
        res.writeHead(201, helpers.headers);
        res.end(data);
      });
}
