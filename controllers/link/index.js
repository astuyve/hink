// Links Controller
// There should be a GET list all and POST new note defined for cli
// The rest of the endpoints are for frontend consumption
//TODO This controller is too similar to Notes, Find some way to abstract them

var mongoose = require('mongoose')

var db = mongoose.connection;
var Link = db.model('Link', Link)


exports.list = function(req, res, next){
  var category = req.params.category
  Link.find({category: category}).exec(function(err, result) {
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
  var url = req.body.url;

  if (!url) {
    res.end('must supply content\n')
  }
  var aLink = new Link({ category: req.params.category
                       , created_at: Date()
                       , title: title
                       , url: url });
  aLink.save(function(err, result) {
    if (!err) {
      res.end('added!');
    } else {
      // error handling
      res.end('not added!');
    }
  });
}

// This doesn't work yet.
// look here http://mongoosejs.com/docs/queries.html
exports.search = function(req, res, next) {
  var q = req.params.q
  var category = req.params.category
  Link
    .find({})
    .where(q).in(['title', 'url'])
    .exec(function(err, result) {
      console.log(result);
  })
}

exports.show = function(req, res, next){
  Link.find({}).exec(function(err, result) {
    if (!err) { 
      res.end(JSON.stringify(result));
    } else {
      res.end("nothin'!");
      // error handling
    };
  });
};

exports.edit = function(req, res, next){
  res.end('edit');
};

exports.update = function(req, res, next){
  res.end('update')
};
