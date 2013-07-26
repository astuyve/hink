
exports.setup = function(router, mongoose) {
  var Notes = mongoose.model('Notes', Notes)
  router.get('/notes', function (req, res) {
    notes = Notes.find()
    res.end(notes)
  });
  router.get('/notes/:category', function (req, res) {
    var category = req.params.category
    res.end(category);
  });
}
