// Notes Controller
var Note = exports.Note


exports.show = function(req, res, next){
  Note.find({}).exec(function(err, result) {
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
/*
  app.post('/notes/:category', function(req, res) {
    var test_data = { category: req.params.category
                    , created_at: Date()
                    , title: req.params.title
                    , content: req.params.content };
    var test = new Note(test_data);
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
*/
