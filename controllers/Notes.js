// Notes Controller
// '/notes'

module.exports = function (app) {
  var mongoose = require('mongoose'),
      db = require('../db'),
      config = require('../config');
      
  app.resource('/', {
    'get' : function(req, res) {
      db.Note.find({}).exec(function(err, result) { 
        if (!err) { 
          res.end(JSON.stringify(result, undefined, 2));
        } else {
          // error handling
          res.end('An error occurred');
        };
      });
    },

    /*'put' : function(req, res) {
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
    }*/
  });

  app.resource('/:title', {
    'get' : function(req, res) {
      db.Note.findOne({'title':req.params.title}).exec(function(err, result) {
        if (!err) {
          res.end(JSON.stringify(result, undefined, 2));
        } else {
          res.end('An error occurred');
        };
      });
    },

    'put' : function(req, res) {
      var entry_data = {created_at: Date(), title: req.params.title, content: req.query.body};
      var entry = new db.Note(entry_data);
      entry.save(function(err, result) {
        if (!err) {
          res.end('Added!');
        } else {
          res.end('Not Added!');
        }
      });
    },

    'delete' : function(req, res) {
      db.Note.remove({title : req.params.title}, function(err, result) {
        if (!err) {
          res.end('Deleted');
        } else {
          res.end('An error occurred');
        };
      });
    }
  });
}
