var Set = require('set')

var TextController = function(myModel) {
  this.myModel = myModel
}

TextController.prototype.cat_list = function(req, res, next) {
  // list all current categories
  this.myModel.find({}).exec(function(err, doc) {
    var set = new Set([])
    doc.forEach(function(item) {
      set.add(item.category)
    })
    res.end(JSON.stringify(set.get()));
  })
}

//XXX only searches content at the moment, should also search titles
TextController.prototype.search = function(req, res, next) {
  var q = req.params.q
  var regex = new RegExp(q,'i')
  this.myModel.find( { $or:[{ content: regex }, { title: regex }]}, function(err, docs) {
    res.end(JSON.stringify(docs))
  })
}

TextController.prototype.list = function(req, res, next){
  var category = req.params.category
  this.myModel.find({category: category}).exec(function(err, result) {
    if (!err) {
      res.end(JSON.stringify(result));
    } else {
      // profeshnul error handling
      res.end("UH OH!");
    };
  });
}

TextController.prototype.create = function(req, res, next){
  // category should probably make a new mongo collection
  var title = req.body.title || 'Untitled';
  var content = req.body.content;

  if (!content) {
    res.end('must supply content\n')
  }
  var aModel = new this.myModel({ category: req.params.category
                      , created_at: Date()
                      , title: title
                      , content: content });
  aModel.save(function(err, result) {
    if (!err) {
      res.end('added!');
    } else {
      // error handling
      res.end('not added!');
    }
  });
}

TextController.prototype.show = function(req, res, next){
  this.myModel.findOne({ id: req.params.id }, function (err, doc){
    if (!err) { 
      res.end(JSON.stringify(doc));
    } else {
      res.end("nothin'!");
      // error handling
    };
  });
}

TextController.prototype.update = function(req, res, next){
  this.myModel.findOne({ id: req.params.id }, function (err, doc){
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
}

TextController.prototype._delete = function(req, res, next){
  this.myModel.remove({ _id: req.params.id }, function (err){
    res.end("deleted")
    //fuck that error
  })
}
exports.TextController = TextController
