var connect = require('connect')
  , connectRoute = require('connect-route')
  , app   = connect()
  , config = require('./config')
  , mongoose = require('mongoose')

app.use(connectRoute(function(router) {
  mongoose.connect('mongodb://localhost/' + config.dburi)
  controllers = ['notes']
  controllers.forEach(function(controller) {
    require('./controllers/' + controller).setup(router, mongoose);
  });
}));

app.listen(3000)

