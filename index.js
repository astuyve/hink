var express = require('express')
  , config  = require('./config')
  , mongoose = require('mongoose')
  , endpoints = require('./lib/baseController').endpoints
  , config = require('./config');

//DB Connection
mongoose.connect('mongodb://localhost/' + config.dburi);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose: Database connection error:'));
db.once('open', function callback () {
  console.log('Mongoose: Connected to ' + config.dburi + ' successfully');
});
exports.db = db;

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
  if (req.query.q) {
    results = general_search(req.query.q)
    res.end(JSON.stringify(results))
  } else {
    ep = []
    endpoints.forEach(function(name) {
      // string not object for displaying
      ep.push(name)
    })
    res.end(JSON.stringify(ep))
  }
})

var general_search = function(query) {
  // search all endpoints for query q
  var results = []
  for (k in models) {
    obj = models[k]
    var m = mongoose.model(k)
    var regex = new RegExp(query, 'i')  // ignore case
    searchables = []
    obj.searchable.forEach(function(key) {
      searchables.append({key: regex})
    })

    m.find({ $or: searchables }, function(err, docs) {
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
