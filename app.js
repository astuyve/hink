var app = require('express')()
  , config = require('./config')

// Assign controllers for different prefixes
app.get('/', function(req, res) {
  res.send('index')
})

var controllers = ["notes", "links"]
controllers.forEach(function(controller){
  app.use(require('./controllers/' + controller));
})

app.listen(config.port);

module.exports = app;
