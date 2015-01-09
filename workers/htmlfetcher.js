// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var fs = require('fs');

var archive = require('/Users/student/Desktop/2014-12-web-historian/helpers/archive-helpers.js');


var siteTextPath = "/Users/student/Desktop/2014-12-web-historian/web/archives/sites.txt"

fs.readFile(siteTextPath, 'UTF-8', function(err, data){
  if (err) throw err;

  // storage that holds all urls
  var storage = data.split('\n');
  var lastItem = storage.pop();

  for (var i = 0; i < storage.length; i++) {
    if (!archive.isURLArchived(storage[i])) {
      archive.downloadUrls(storage[i]);
    }
  }
});
