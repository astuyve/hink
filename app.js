var connect = require('connect')
  , connectRoute = require('connect-route')
  , app   = connect()
  , mongoose = require('mongoose')
  , notes = require('./controllers/notes')
  , config = require ('./config');

// Connect Mongoose to MongoDB
mongoose.connect('mongodb://localhost/' + config.DB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', function callback () {
  console.log('Connected to ' + config.DB_URI + ' successfully');
});

app.use(connectRoute(function(router) {
  router.get('/notes', notes.all)
  router.get('/notes/:category', notes.getCategory)
  //router.get('/notes/:id', notes.getNote)
}));

app.listen(config.PORT);
module.exports = app;
