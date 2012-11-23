
  var express = require('express');

  var app = express.createServer();


  //Based on code from connect


  function changeContentType(req, res, next) {
    function update(req) {
      console.log(req.method);
      var str = req.headers['content-type'] || '',
          contentType = str.split(';')[0],
          isAppJson = contentType === 'application/json',
          newHeader = isAppJson ? str.replace('application/json', 'text/plain') : str;
      req.headers['content-type'] = newHeader;
    }
    if(req.method === 'GET') update(req);
    return next();
  }

  app.use(express.favicon());
  app.use(express.logger());
  app.use(changeContentType);
  app.use(express.bodyParser());
  app.use(express.cookieParser());

  app.get('/', function(req, res){
    res.send('This is a page.');
  });

  app.listen(13000);
  console.log('Express app started on port 3000');