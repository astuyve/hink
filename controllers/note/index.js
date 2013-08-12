// Notes Controller
// There should be a GET list all and POST new note defined for cli
// The rest of the endpoints are for frontend consumption
var mongoose = require('mongoose')
  , Set = require('set')
  , db = mongoose.connection
  , Note = db.model('Note', Note)

exports.cat_list = function(req, res, next) {
  // list all current categories
  Note.find({}).exec(function(err, all) {
    var set = new Set([])
    all.forEach(function(item) {
      set.add(item.category)
    })
    res.end(JSON.stringify(set.get()));
  })
}

exports.list = function(req, res, next){
  var category = req.params.category
  Note.find({category: category}).exec(function(err, result) {
    if (!err) {
      res.end(JSON.stringify(result));
    } else {
      // profeshnul error handling
      res.end("UH OH!");
    };
  });
};

exports.create = function(req, res, next){
  // category should probably make a new mongo collection
  var title = req.body.title || 'Untitled';
  var content = req.body.content;

  if (!content) {
    res.end('must supply content\n')
  }
  var aNote = new Note({ category: req.params.category
                       , created_at: Date()
                       , title: title
                       , content: content });
  aNote.save(function(err, result) {
    if (!err) {
      res.end('added!');
    } else {
      // error handling
      res.end('not added!');
    }
  });
}

// This doesn't work yet.
// look here http://mongoosejs.com/docs/queries.html
exports.search = function(req, res, next) {
  var q = req.params.q
  Note
    .find({})
    .where(q).in(['title', 'content'])
    .exec(function(err, result) {
      console.log(result);
  })
}

exports.show = function(req, res, next){
  Note.find({}).exec(function(err, result) {
    if (!err) { 
      res.end(JSON.stringify(result));
    } else {
      res.end("nothin'!");
      // error handling
    };
  });
};

exports.edit = function(req, res, next){
  res.end('edit');
};

exports.update = function(req, res, next){
  res.end('update')
};


