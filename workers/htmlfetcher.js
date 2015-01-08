// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var fs = require('fs');
var http = require('http-request');

var archive = require('/Users/student/Desktop/2014-12-web-historian/helpers/archive-helpers.js');

var sitesPath = "/Users/student/Desktop/2014-12-web-historian/web/archives/sites/"
var siteTextPath = "/Users/student/Desktop/2014-12-web-historian/web/archives/sites.txt"

fs.readFile(siteTextPath, 'UTF-8', function(err, data){
  if (err) throw err;

  // storage that holds all urls
  var storage = data.split('\n');
  var lastItem = storage.pop();

  for (var i = 0; i < storage.length; i++) {
    if (!archive.isURLArchived(storage[i])) {
      // http.get(options, file, cb);
      console.log(storage[i]);
      http.get({
          url: 'http://' + storage[i],
          progress: function (current, total) {
            console.log('downloaded %d bytes from %d', current, total);
          }
        }, sitesPath + storage[i] + ".html", function (err, res) {
          if (err) {
            console.error(err);
            return;
          }
          console.log(res.code, res.headers, res.file);
        });
    }
  }
});
