// File Controller
// for file data
//
// inherits: cat_list, list & delete

var BaseController = require('./baseController').BaseController

var FileController = function(myModel) {
  this.myModel = myModel
}

FileController.prototype = new BaseController()

FileController.prototype.create = function(req, res, next) {
  // this should eventually allow a url as input for the path
  // in addition to the regular file path
  var title = req.body.title || "Untitled"
  var description = req.body.description || ""
  var files = req.files
  var category = req.params.category
  console.log(files)
  //TODO name the upload file
  fs.readFile(req.files.img.path, function (err, data) {
  // ...
    var newPath = __dirname + "/public/files/" + category
    console.log("writing file to " + newPath)
    fs.writeFile(newPath, data, function (err) {
      if (!err) {
        res.end("successful upload")
      } else {
        //TODO better error handling
        res.end("problem with upload")
      }
    })
  })
}

FileController.prototype.show = function(req, res, next){
  this.myModel.findOne({ id: req.params.id }, function (err, doc){
    if (!err) {
      res.json(doc)
    } else {
      //TODO error handling
      res.end("nothin'!")
    }
  })
}

FileController.prototype.update = function(req, res, next){
  this.myModel.findOne({ id: req.params.id }, function (err, doc){
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
  res.end('updated')
}

FileController.prototype.search = function(req, res, next) {
  var q = req.params.query
  console.log("search query: " + q)
  var regex = new RegExp(q,'i')
  this.myModel.find( { $or:[{ content: regex }, { title: regex }]}, function(err, docs) {
    res.json(docs)
  })
}

exports.FileController = FileController
