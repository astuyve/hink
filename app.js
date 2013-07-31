var connect = require('connect')
  , resource = require('resource-router')
  , config = require('./config');

var app = connect.createServer();
app.use(connect.query());

// Assign controllers for different prefixes
app.use('/notes', resource(require('./controllers/Notes')));

app.listen(config.port);

module.exports = app;
