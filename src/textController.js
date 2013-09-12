// Text Controller
// for textual data
//
// inherits: cat_list, list & delete

var BaseController = require('./baseController').BaseController

var TextController = function(myModel) {
  this.myModel = myModel
}

TextController.prototype = new BaseController()

TextController.prototype.create = function(req, res, next){
  // category should probably make a new mongo collection
  var title = req.body.title || 'Untitled'
  var content = req.body.content

  if (!content) {
    res.end('must supply content\n')
  }
  var aModel = new this.myModel({
                        category: req.params.category
                      , created_at: Date()
                      , title: title
                      , content: content })
  aModel.save(function(err, result) {
    if (!err) {
      res.end('added!')
    } else {
      //TODO error handling
      res.end('not added!')
    }
  })
}

TextController.prototype.show = function(req, res, next){
  this.myModel.findOne({ id: req.params.id }, function (err, doc){
    if (!err) { 
      res.json(doc)
    } else {
      //TODO error handling
      res.end("nothin'!")
    }
  })
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
    doc.save()
  })
}

TextController.prototype.search = function(req, res, next) {
  var q = req.params.query
  var regex = new RegExp(q,'i')
  this.myModel.find( { content: regex }, function(err, docs) {
    console.log(docs)
    this.myModel.find( { title: regex }, function(err, docs2) {
      console.log(docs2)
      res.json(docs + docs2)
    })
  })
}

exports.TextController = TextController
