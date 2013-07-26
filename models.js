exports.setup = function(mongoose, db) {
  var Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

  noteSchema = new Schema({
    created_at: Date,
    title: String,
    content: String,
  });

  //register models
  var Note = mongoose.model('Note', noteSchema);

}
