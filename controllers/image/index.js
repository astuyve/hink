// Image Controller

var mongoose = require('mongoose')
  , Set = require('set')
  , db = mongoose.connection
  , Image = db.model('Image')

exports.cat_list = function(req, res, next) {
  // list all current categories
  Image.find({}).exec(function(err, doc) {
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
  Image.find( { title: regex }, function(err, docs) {
    res.end(JSON.stringify(docs))
  })
}

exports.list = function(req, res, next){
  var category = req.params.category
  Image.find({category: category}).exec(function(err, docs) {
    if (!err) {
      res.end(JSON.stringify(docs));
    } else {
      // profeshnul error handling
      res.end("UH OH!");
    };
  });
};

exports.create = function(req, res, next){
  // category should probably make a new mongo collection
  var title = req.body.title || 'Untitled';
  var content = req.files;
  console.log(content)

  if (!content) {
    res.end('must supply an image\n')
  }
  var anImage = new Image({ category: req.params.category
                          , created_at: Date()
                          , title: title
                          , path: content.path });
  anImage.save(function(err) {
    if (!err) {
      res.end('added!');
    } else {
      // error handling
      res.end('not added!');
    }
  });
}

exports.show = function(req, res, next){
  Image.findOne({ _id: req.params.id }, function (err, doc){
    if (!err) {
      res.end(JSON.stringify(doc));
    } else {
      res.end("nothin'!");
      // error handling
    };
  });
};

exports.update = function(req, res, next){
  Image.findOne({ _id: req.params.id }, function (err, doc){
    var title = req.body.title
    if (title) {
      doc.title = title
    }
    doc.save();
  });
};

exports.delete = function(req, res, next){
  Image.remove({ _id: req.params.id }, function (err){
    res.end("deleted")
    //fuck that error
  })
};

