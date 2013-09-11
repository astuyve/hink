// Text Controller
// for textual data
//
// inherits: cat_list, list & delete
var Set = require('set')

//var BaseController = require('./baseController').BaseController

var TextController = function(myCollection) {
  this.myCollection = myCollection
}

TextController.prototype.cat_list = function(req, res, next) {
  // list all current categories
  this.myCollection.find({}, function(err, doc) {
    var set = new Set([])
    doc.forEach(function(item) {
      set.add(item._doc.category)
    })
    res.json(set.get());
  })
}

TextController.prototype.list = function(req, res, next){
  var category = req.params.category
  this.myCollection.find({category: category}, function(err, result) {
    if (!err) {
      res.json(result)
    }
    res.end("UH OH!");
  });
}

TextController.prototype.destroy = function(req, res, next){
  this.myCollection.remove({ _id: req.params.id }, function (err){
    if (!err) {
      res.end("deleted")
    }
    res.end("something went wrong")
  })
}

TextController.prototype.create = function(req, res, next){
  // category should probably make a new mongo collection
  var title = req.body.title || 'Untitled';
  var content = req.body.content;

  if (!content) {
    res.end('must supply content\n')
  }
  var aDoc = new this.myCollection({
                        category: req.params.category
                      , created_at: Date()
                      , title: title
                      , content: content });
  aDoc.save(function(err, result) {
    if (!err) {
      res.end('added!');
    } else {
      //TODO error handling
      res.end('not added!');
    }
  });
}

TextController.prototype.show = function(req, res, next){
  this.myCollection.findOne({ _id: req.params.id }, function (err, doc){
    if (!err) { 
      res.end(JSON.stringify(doc));
    } else {
      //TODO error handling
      res.end("nothin'!");
    };
  });
}

TextController.prototype.update = function(req, res, next){
  this.myCollection.findOne({ _id: req.params.id }, function (err, doc){
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

TextController.prototype.search = function(req, res, next) {
  var q = req.query.q
  console.log("search query: " + q)
  var regex = new RegExp(q,'i')
  this.myCollection
    .find( { $or:[{ content: regex }, { title: regex }]}, function(err, docs) {
      res.json(docs)
  })
}

exports.TextController = TextController
