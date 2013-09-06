// models.js


// MODELS
var Note = new Schema({
  created_at: Date,
  category: String,
  title: String,
  content: String,
});

var Link = new Schema({
  created_at: Date,
  category: String,
  title: String,
  content: String,
});

var Image = new Schema({
  created_at: Date,
  category: String,
  title: String,
  path: String,
  content: String,  // a description of what the image is
});

// register the models
exports.Note  = mongoose.model('Note', Note);
exports.Link  = mongoose.model('Link', Link);
exports.Image = mongoose.model('Image', Image);
