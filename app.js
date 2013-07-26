var connect = require('connect')
  //, connectRoute = require('connect-route')
  //, app   = connect()
  , mongoose = require('mongoose')
  , resource = require('resource-router')
  , router = require('./router')
  , config = require('./config');

var server = connect.createServer();
server.use(resource(router));
server.listen(config.port);

/*app.use(connectRoute(function(router) {
  mongoose.connect('mongodb://localhost/' + config.dburi);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Database connection error:'));
  db.once('open', function callback () {
    console.log('Connected to ' + config.dburi + ' successfully');
  });

  controllers = ['notes']
  controllers.forEach(function(controller) {
    require('./controllers/' + controller).setup(router, mongoose);
  });
}));

app.listen(config.port);
module.exports = app;*/
