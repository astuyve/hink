exports.all = function (req, res) {
  // get all notes
  res.end('all notes')
  };
exports.getCategory = function (req, res) {
  var category = req.params.category
  res.end(category);
  };
