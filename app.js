var connect = require('connect')
  , connectRoute = require('connect-route')
  , app   = connect()
  , mongoose = require('mongoose')
  , notes = require('./controllers/notes')
  , config = require('./config')
  , models = require('./models'); 

app.use(connectRoute(function(router) {
  mongoose.connect('mongodb://localhost/' + config.dburi);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Database connection error:'));
  db.once('open', function callback () {
    console.log('Connected to ' + config.dburi + ' successfully');
  });
  models.setup(mongoose, db);

  controllers = ['notes']
  controllers.forEach(function(controller) {
    require('./controllers/' + controller).setup(router, mongoose);
  });
}));

app.listen(config.port);
module.exports = app;
