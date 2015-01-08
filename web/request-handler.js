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
    console.log('get');
    if (req.url === '/') {
      res.writeHead(200, helpers.headers);
      fs.readFile('public/index.html', 'UTF-8', function(err, data){
          if (err) throw err;
          res.end(data);
        });
   }
   // else {
    //   // var headers = {
    //   //       "access-control-allow-origin": "*",
    //   //       "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    //   //       "access-control-allow-headers": "content-type, accept",
    //   //       "access-control-max-age": 10, // Seconds.
    //   //       'Content-Type': "text/css"
    //   //     };
    //   res.writeHead(200, helpers.headers);
    //   fs.readFile('public' + req.url, 'UTF-8', function(err, data){
    //       if (err) throw err;
    //       res.end(data);
    //     });
    // }
  }

  if (req.method === 'POST') {
    // check sites.txt to see if url is there
    archive.readListOfUrls();
    res.end();

  }


};


