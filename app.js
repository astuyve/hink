var connect = require('connect')
  , connectRoute = require('connect-route')
  , app   = connect()
  , mongoose = require('mongoose')
  , notes = require('./controllers/notes')

app.use(connectRoute(function(router) {
  router.get('/notes', notes.all)
  router.get('/notes/:category', notes.getCategory)
  //router.get('/notes/:id', notes.getNote)
}));

app.listen(3000)
module.exports = app;
