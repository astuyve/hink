// Text Controller
// for textual data
//
// inherits: cat_list, list & delete
var Set = require('set')
  , BaseController = require('./baseController').BaseController

var TextController = function(myCollection) {
  this.myCollection = myCollection
}
TextController.prototype = new BaseController()

TextController.prototype.create = function(req, res){
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
  console.log(aDoc)
  aDoc.save(function(err, result) {
    if (!err) {
      res.end('added!');
    } else {
      //TODO error handling
      res.end('not added!');
    }
  });
}

TextController.prototype.show = function(req, res){
  this.myCollection.findOne({ _id: req.params.id }, function (err, doc){
    if (!err) { 
      res.end(JSON.stringify(doc));
    } else {
      //TODO error handling
      res.end("nothin'!");
    };
  });
}

TextController.prototype.update = function(req, res){
  this.myCollection.findOne({ _id: req.params.id }, function (err, doc){
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

TextController.prototype.search = function(req, res) {
  var q = req.params.query
  console.log("search query: " + q)
  var regex = new RegExp(q,'i')
  this.myCollection
    .find( { $or:[{ content: regex }, { title: regex }]}, function(err, docs) {
      res.json(docs)
  })
}

exports.TextController = TextController
