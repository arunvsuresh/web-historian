var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var helpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //res.end(archive.paths.list);
  if (req.method === 'GET') {
    console.log(req.url);
    if (req.url === '/') {
      res.writeHead(200, helpers.headers);
      fs.readFile('public/index.html', 'UTF-8', function(err, data){
          if (err) throw err;
          res.end(data);
        });
   }
   else if (req.url === '/styles.css' || req.url === '/favicon.ico') {
      res.writeHead(200, helpers.headers);
      console.log('public' + req.url);
      fs.readFile('public' + req.url, 'UTF-8', function(err, data){
          if (err) throw err;
          res.end(data);
        });
    }
  }

  if (req.method === 'POST') {
    // check sites.txt to see if url is there
    //console.log(req);
    req.on('data', function(data){
      var url = data.toString('utf8').split('=')[1];
      archive.readListOfUrls(url, res);
    });
}


};


