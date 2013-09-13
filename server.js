var express = require('express')
  , config  = require('./config')
  , mongoose = require('mongoose')

var app = module.exports = express()

app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser('some secret here'));
app.use(express.session());
app.use(express.methodOverride());
app.use(express.bodyParser(
      { keepExtensions: true
      , uploadDir: __dirname + "public/uploads"
      }));

require('./routes/index')(app, config)

// load controllers
require('./src/init')(app, { verbose: !module.parent })

app.use(function(err, req, res, next){
  // treat as 404
  if (~err.message.indexOf('not found')) return next();
  // log it
  console.error(err.stack);
  // error page
  res.status(500)
});

// assume 404 since no middleware responded
app.use(function(req, res, next){
  res.status(404)
});

app.listen(config.port);
