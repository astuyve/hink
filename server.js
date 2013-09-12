var express = require('express')
  , config  = require('./config')
  , mongoose = require('mongoose')
  , models  = require('./models')
  , endpoints = require('./src/baseController').endpoints


var app = module.exports = express()

app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser('some secret here'));
app.use(express.session());
app.use(express.methodOverride());
app.use(express.bodyParser(
      { keepExtensions: true
      , uploadDir: __dirname + "public/uploads"
      }));

//pull this query logic out from index.js
app.get('/', function(req, res) {
  ep = []
  endpoints.forEach(function(name) {
    // string not object for displaying
    ep.push(String(name))
  })
  res.end(JSON.stringify(ep))
})

// global search
// The scope of this is fucked
app.get('/search/:query?', function(req, res) {
  var query = req.params.query
  result = generalSearch(query)
  if (result) {
    res.json(result)
  }
})

function generalSearch(query) {
  var results = []
  for (model in models) {
    if (model === 'db') { continue }
    console.log(model)
    var m = mongoose.model(model)
    var regex = new RegExp(query, 'i')  // ignore case
    m.find({ $or:[{ content: regex }, { title: regex }]}, function(err, docs) {
      docs.forEach(function(doc) {
        if (doc !== []) {
          results.push(doc)
        }
      })
    })
  }
  return results
}

// load controllers
require('./src/init')(app, { verbose: !module.parent });

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
