var express = require('express')
  , config  = require('./config')
  , models  = require('./models')
  , endpoints = require('./lib/generic_control').endpoints

var app = module.exports = express()

app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser('some secret here'));
app.use(express.session());
app.use(express.bodyParser());
app.use(express.methodOverride());

app.get('/', function(req, res) {
  ep = []
  endpoints.forEach(function(name) {
    ep.push(String(name))
  })
  res.send('try one of the endpoints: \n' + ep)
})

// load controllers
require('./lib/boot')(app, { verbose: !module.parent });

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
