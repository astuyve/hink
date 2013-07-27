// Notes Controller

module.exports = function (app, mongoose) {
  var mongoose = require('mongoose')
    , Note = exports.Note

  app.get('/notes', function(req, res){
    Note.find({}).exec(function(err, result) {
      if (!err) { 
        res.end(JSON.stringify(result));
      } else {
        res.end("nothin'!");
        // error handling
      };
    });
  }),
  app.post('/notes/:category', function(req, res) {
    var test_data = { category: req.params.category
                    , created_at: Date()
                    , title: req.params.title
                    , content: req.params.content };
    var test = new Note(test_data);
    test.save(function(err, result) {
      if (!err) {
        res.end('added!');
      } else {
        // error handling
        res.end('not added!');
      }
    });
  })
}
