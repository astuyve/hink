var express = require('express')
  , config  = require('./config')
  , mongoose = require('mongoose')
  , db = mongoose.connection

// DB Connection
mongoose.connect('mongodb://localhost/' + config.dburi);
db.on('error', console.error.bind(console, 'Mongoose: Database connection error:'));

var app = express()

app.use(express.static(__dirname + '/public'));
app.use(express.methodOverride());
app.use(express.bodyParser({
      uploadDir: __dirname + "public/uploads"
    , keepExtensions: true
    }));

// index route
require('./routes/index')(app, config)

// generate and load controllers
// register the models. Basically everything happens here
require('./src/init')(app);

// errors
app.use(function(err, req, res, next){
  // treat as 404
  if (~err.message.indexOf('not found')) return next();
  console.error(err.stack);
  res.status(500)
});

// assume 404 since no middleware responded
app.use(function(req, res, next){
  res.status(404)
});

// listen port
var port = process.env.PORT || 3000
app.listen(port);
console.log("\napp listening on port " + port)

// expose the app
exports = module.exports = app
