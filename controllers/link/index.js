// Links Controller
// There should be a GET list all and POST new note defined for cli
// The rest of the endpoints are for frontend consumption
//TODO This controller is too similar to Notes, Find some way to abstract them

var mongoose = require('mongoose')
  , Set = require('set')
  , db = mongoose.connection
  , Link = db.model('Link', Link)

exports.cat_list = function(req, res, next) {
  // list all current categories
  Link.find({}).exec(function(err, all) {
    var set = new Set([])
    all.forEach(function(item) {
      set.add(item.category)
    })
    res.end(JSON.stringify(set.get()));
  })
}

exports.search = function(req, res, next) {
  var q = req.params.q
  var regex = new RegExp(q,'i')
  var results = new Set()
  Link.find({ content: regex }, function(err, doc) {
    doc.forEach(function(item) {
      results.add(doc)
    })
  })
  Link.find({ title: regex }, function(err, doc) {
    doc.forEach(function(item) {
      results.add(doc)
    })
    res.end(JSON.stringify(results.get()))
  })
}

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

exports.show = function(req, res, next){
  Link.findOne({ id: req.params.id }, function (err, doc){
    if (!err) { 
      res.end(JSON.stringify(doc));
    } else {
      res.end("nothin'!");
      // error handling
    };
  });
};

exports.update = function(req, res, next){
  Link.findOne({ id: req.params.id }, function (err, doc){
    //XXX make this suck less
    var title = req.body.title
    var url = req.body.url
    if (title) {
      doc.title = title
    }
    if (url) {
      doc.url = url
    }
    doc.save();
  });
};

exports.edit = function(req, res, next){
  res.end('edit');
};
