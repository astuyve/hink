var express = require('express')
  , config = require('../config')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , TextController = require('./textController').TextController
  , FileController = require('./fileController').FileController

module.exports = function(parent, options){
  models = config.models
  for (var name in models) {
    var obj = models[name]
      , schema = new Schema({ })
      , m = mongoose.model(name, schema) // register the collection
      , controller
    console.log('\n %s: %s', obj.name, obj.type);
    console.log('   - registered ' + name)
    switch (obj.type) {
      case 'text':
        controller = new TextController(m)
      case 'file':
        controller = new FileController(m)
      default:
        controller = new TextController(m)
    }
    console.log(controller)
    var app = express()
      , rname = obj.name
      , method
      , path;

    path = '/' + rname
    // cat_list
    app['get'](path, controller['cat_list']);
    // show
    app['get'](path + '/:category/:id', controller['show'])
    // list
    app['get'](path + '/:category/:id', controller['list'])
    // delete
    app['get'](path + '/:category/:id/delete', controller['delete'])
    // update
    app['put'](path + '/:category/:id', controller['update'])
    // create
    app['post'](path + '/:category', controller['create'])
    // search
    app['get'](path + '/:category/search/:q', controller['search'])

    //app[method](path, controller[key]);

  }
  // mount the app
  parent.use(app);
};
