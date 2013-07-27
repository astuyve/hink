var connect = require('connect')
  , resource = require('resource-router')
  , config = require('./config');

var app = connect.createServer();

// Assign controllers for different prefixes
app.use('/notes', resource(require('./controllers/notes')));

app.listen(config.port);

module.exports = app;
