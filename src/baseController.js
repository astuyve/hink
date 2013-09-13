// Base Controller
// for all other controllers to inherit from
// defines:
//   - cat_list
//   - list
//   - destroy

var Set = require('set')

var BaseController = function(myCollection) {
  this.myCollection = myCollection
}

BaseController.prototype.cat_list = function(req, res, next) {
  // list all current categories
  this.myCollection.find({}, function(err, doc) {
    var set = new Set([])
    doc.forEach(function(item) {
      set.add(item._doc.category)
    })
    res.json(set.get())
  })
}

BaseController.prototype.list = function(req, res, next){
  var category = req.params.category
  this.myCollection.find({category: category}, function(err, result) {
    if (!err) {
      res.json(result)
    }
    //TODO profeshnul error handling
    res.end("UH OH!")
  })
}

BaseController.prototype.destroy = function(req, res, next){
  this.myCollection.remove({ _id: req.params.id }, function (err){
    if (!err) {
      res.end("deleted")
    }
    //TODO error handling
    res.end("something went wrong")
  })
}

exports.BaseController = BaseController
