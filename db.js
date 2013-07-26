// db.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    config = require('./config');

//Connect to database
mongoose.connect('mongodb://localhost/' + config.dburi);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', function callback () {
  console.log('Connected to ' + config.dburi + ' successfully');
});

// MODELS
var noteSchema = new Schema({
  created_at: Date,
  title: String,
  content: String,
});

exports.dbConnection = db;
exports.Note = mongoose.model('Note', noteSchema);
