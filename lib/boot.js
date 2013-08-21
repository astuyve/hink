var express = require('express')
  , fs = require('fs')
  , config = require('../config');

module.exports = function(parent, options){
  var verbose = config.verbose;
  fs.readdirSync(__dirname + '/../controllers').forEach(function(name){
    verbose && console.log('\n %s:', name);
    var obj = require('./../controllers/' + name)
      , name = obj.name || name
      , prefix = obj.prefix || ''
      , app = express()
      , method
      , path;

    // generate routes based
    // on the exported methods
    for (var key in obj) {
      // "reserved" exports
      if (~['name', 'prefix', 'before'].indexOf(key)) continue;
      // route exports
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

      path = prefix + path;
      app[method](path, obj[key]);
      verbose && console.log(' %s %s -> %s', method.toUpperCase(), path, key);
    }

    // mount the app
    parent.use(app);
  });
};
