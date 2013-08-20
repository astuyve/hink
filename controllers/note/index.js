// Notes Controller

var mongoose = require('mongoose')
  , Set = require('set')
  , db = mongoose.connection
  , Note = db.model('Note', Note)

exports.cat_list = function(req, res, next) {
  // list all current categories
  Note.find({}).exec(function(err, doc) {
    var set = new Set([])
    doc.forEach(function(item) {
      set.add(item.category)
    })
    res.end(JSON.stringify(set.get()));
  })
}

exports.search = function(req, res, next) {
  var q = req.params.q
  var regex = new RegExp(q,'i')
  Note.find({ content: regex }, function(err, doc1) {
    Note.find({ title: regex }, function(err, doc2) {
      res.end(JSON.stringify(doc1 + doc2))
    })
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

exports.show = function(req, res, next){
  Note.findOne({ id: req.params.id }, function (err, doc){
    if (!err) { 
      res.end(JSON.stringify(doc));
    } else {
      res.end("nothin'!");
      // error handling
    };
  });
};

exports.update = function(req, res, next){
  Note.findOne({ id: req.params.id }, function (err, doc){
    //XXX make this suck less
    var title = req.body.title
    var content = req.body.content
    if (title) {
      doc.title = title
    }
    if (content) {
      doc.content = content
    }
    doc.save();
  });
};

exports.edit = function(req, res, next){
  res.end('edit');
};

