// models.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    config = require('./config');

//DB Connection
mongoose.connect('mongodb://localhost/' + config.dburi);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose: Database connection error:'));
db.once('open', function callback () {
  console.log('Mongoose: Connected to ' + config.dburi + ' successfully');
});

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
exports.db = db;
exports.Note  = mongoose.model('Note', Note);
exports.Link  = mongoose.model('Link', Link);
exports.Image = mongoose.model('Image', Image);
