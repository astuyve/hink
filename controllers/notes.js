// Notes Controller

module.exports = function (app) {
  var mongoose = require('mongoose')
    , models   = require('../models')
    , Note = models.Note

  app.resource('/', {
    'get' : function(req, res) {
      Note.find({}).exec(function(err, result) { 
        if (!err) { 
          res.end(JSON.stringify(result, undefined, 2));
        } else {
          // error handling
        };
      });
    },

  }),
  app.resource('/:category', {
    'get' : function(req, res) {
      Note.find({ category: req.params.category }).exec(function(err, results) {
        if (!err) {
          res.end(JSON.stringify(result, undefined,2));
        } else {
          res.end('No category' + req.params.category);
          // error handling
        }
      })
    },
    'put' : function(req, res) {
      var test_data = { category: req.params.category
                      , created_at: Date()
                      , title: req.params.title
                      , content: req.params.content };
      var test = new Note(test_data);
      test.save(function(err, result) {
        if (!err) {
          res.end('added!');
        } else {
          // error handling
          res.end('not added!');
        }
      });
    }
  })
}
