
exports.setup = function(mongoose, db) {
  var Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

  Note= new Schema({
    created: Date,
    title: String,
    content: String,
  })
  //register models
  mongoose.model('Comment', Comment)
  mongoose.model('Contact', Contact)

}
