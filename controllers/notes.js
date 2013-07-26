//var models = require('../models');

exports.all = function(req, res) {
  // get all notes
  res.end('all notes')
};

exports.getCategory = function(req, res) {
  var category = req.params.category;
  res.end(category);
};

exports.create = function(req, res) {
  var title = req.params.title;
  var content = req.params.content;

  var newnote = new Note({ created_at: 'TODO', title: title, content: content });
  newnote.save(function (err, newnote) {
    if (err) { // TODO handle the error
      console.log('An error occurred trying to add a new note');
    }
  });
}
