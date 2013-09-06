var express = require('express')
  , fs = require('fs')
  , config = require('../config');

module.exports = function(parent, options){
  var verbose = config.verbose;
  fs.readdirSync(__dirname + '/../controllers').forEach(function(name){
    verbose && console.log('\n %s:', name);
    if (type === 'text') {
      controller = require('./lib/textController')
    }
    var obj = require('./../controllers/' + name)
      , name = obj.name || name
      , app = express()
      , method
      , path;

    // generate routes based
    // on the exported methods
    keys = \
      ['cat_list', 'get', 'show', 'list', 'delete', 'update', 'create', 'search']
    for (var key in keys) {
      switch (key) {
        case 'cat_list':
          method = 'get'
          path = '/' + name
          break;
        case 'show':
          method = 'get'
          path = '/' + name + '/:category' + '/:id';
          break;
        case 'list':
          method = 'get'
          path = '/' + name + '/:category';
          break;
        case 'delete':
          method = 'get';
          path = '/' + name + '/:category' + '/:id/delete';
          break;
        case 'update':
          method = 'put';
          path = '/' + name + '/:category' + '/:id';
          break;
        case 'create':
          method = 'post';
          path = '/' + name + '/:category';
          break;
        case 'search':
          method = 'get';
          path = '/' + name + '/:category' + '/search/:q';
          break;
        default:
          throw new Error('unrecognized route: ' + name + '.' + key);
      }

      app[method](path, controller[key]);
      verbose && console.log(' %s %s -> %s', method.toUpperCase(), path, key);
    }

    // mount the app
    parent.use(app);
  });
};
