// TimeController
//
// Controller for time based data - tasks, events, etc
// keys:
//   - title
//   - content (optional)
//   - date (optional)

var BaseController = require('./baseController').BaseController

var TimeController = function(myCollection) {
  this.myCollection = myCollection
}

TimeController.prototype = new BaseController()

TimeController.prototype.create = function(req, res) {
  var title   = req.body.title || 'Untitled';
  var content = req.body.content || null
  var date    = req.body.date || null

  if (!date) {
    res.end('must supply date\n')
  }
  var aDoc = new this.myCollection({
                        category: req.params.category
                      , date: date
                      , title: title
                      , content: content });
  aDoc.save(function(err, result) {
    if (!err) {
      res.end('added!');
    } else {
      //TODO error handling
      res.end('not added!');
    }
  })
}

TextController.prototype.update = function(req, res){
  this.myCollection.update({ _id: req.params.id }, function (err, doc){
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

TimeController.prototype.search = function(req, res) {
  var q = req.params.query
  console.log("search query: " + q)
  var regex = new RegExp(q,'i')
  this.myCollection
    .find( { $or:[{ content: regex }, { title: regex }]}, function(err, docs) {
      res.json(docs)
  })
}

exports.TimeController = TimeController

