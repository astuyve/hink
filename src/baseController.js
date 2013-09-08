// Base Controller
// for all other controllers to inherit from

// Establish a list of endpoints from the models
var models = require('./../config').models
  , Set = require('set')
  , endpoints = []

var BaseController = function(myModel) {
  this.myModel = myModel
}

BaseController.prototype.cat_list = function(req, res, next) {
  // list all current categories
  this.myModel.find({}).exec(function(err, doc) {
    var set = new Set([])
    doc.forEach(function(item) {
      set.add(item.category)
    })
    res.end(JSON.stringify(set.get()));
  })
}


BaseController.prototype.list = function(req, res, next){
  var category = req.params.category
  this.myModel.find({category: category}).exec(function(err, result) {
    if (!err) {
      res.end(JSON.stringify(result));
    } else {
      //TODO profeshnul error handling
      res.end("UH OH!");
    };
  });
}

BaseController.prototype._delete = function(req, res, next){
  this.myModel.remove({ _id: req.params.id }, function (err){
    res.end("deleted")
    //TODO error handling
  })
}

for (var k in models) {
  endpoints.push(models[k].name)
}
exports.endpoints = endpoints
exports.BaseController = BaseController
