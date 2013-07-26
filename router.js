// Controller for...well, everything, for now.

var mongoose = require('mongoose'),
    db = require('./db'),
    config = require('./config');


module.exports = function (app) {
  app.resource('/', {
    'get' : function(req, res) {
      db.Note.find({}).exec(function(err, result) { 
        if (!err) { 
          res.end(JSON.stringify(result, undefined, 2));
        } else {
          // error handling
        };
      });
    },

    'put' : function(req, res) {
      var test_data = {created_at: Date(), title: 'test-title', content: 'some content'};
      var test = new db.Note(test_data);
      test.save(function(err, result) {
        if (!err) { 
          res.end('added!');
        } else {
          // error handling
          res.end('not added!');
        }
      });
    }
  });
}
