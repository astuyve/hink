exports.setup = function(router, mongoose) {
  var Notes = mongoose.model('Notes', Notes)

  //List all notes
  router.get('/notes', function (req, res) {
    notes = Notes.find()
    res.end(notes)
  });

  //Create a new note
  router.post('/notes', function (req, res) {
    var title = req.params.title;
    var content = req.params.content;

    var newnote = new Note({ created_at: 'TODO', title: title, content: content });
    newnote.save(function (err, newnote) {
      if (err) { // TODO handle the error
        console.log('An error occurred trying to add a new note');
      }
    });
  });
    

  router.get('/notes/:category', function (req, res) {
    var category = req.params.category
    res.end(category);
  });
}
