
module.exports = function (app, mongoose) {
  var mongoose = require('mongoose')
    , Link = mongoose.model('Link', Link)

  app.get('/link', function(req, res){
    Link.find({}).exec(function(err, result) {
      if (!err) { 
        res.end(JSON.stringify(result));
      } else {
        res.end("nothin'!");
        // error handling
      };
    });
  }),
  app.post('/link/:category', function(req, res) {
    var test_data = { category: req.params.category
                    , title: req.params.title
                    , url: req.params.url };
    var test = new Link(test_data);
    test.save(function(err, result) {
      if (!err) {
        res.end('added!');
      } else {
        // error handling
        res.end('not added!');
      }
    });
  })
}
