var express = require('express')
  , config  = require('./config')
  , mongoose = require('mongoose')
  , models  = require('./models')
  , endpoints = require('./lib/generic_control').endpoints


var app = module.exports = express()

app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser('some secret here'));
app.use(express.session());
app.use(express.bodyParser());
app.use(express.methodOverride());

//pull this query logic out from index.js
app.get('/', function(req, res) {
  results = []
  if (req.query.q) {
    // search all endpoints for query q
    q = req.query.q
    for (model in models) {
      if (model === 'db') { continue }
      m = mongoose.model(model)
      var regex = new RegExp(q, 'i')  // ignore case
      m.find({ text: regex }).exec(function(err, result) {
        if (!err) {
          results.push(result);
        }
      });
    }
    res.end("results of search " + JSON.stringify(results))
  } else {
    ep = []
    endpoints.forEach(function(name) {
      ep.push(String(name))
    })
    res.send('endpoints available: \n' + ep)
  }
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
