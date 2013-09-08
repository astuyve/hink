var express = require('express')
  , config = require('../config')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , TextController = require('./textController').TextController
  , FileController = require('./fileController').FileController

module.exports = function(parent, options){
  manifest = config.manifest
  for (var name in manifest) {
    var obj = manifest[name]
      , schema = new Schema({ any: Schema.Types.Mixed })
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
    var app = express()
      , path = '/' + obj.name

    // cat_list
    app.get(path, controller.cat_list);
    // show
    app.get(path + '/:category/:id', controller.show)
    // list
    app.get(path + '/:category/:id', controller.list)
    // delete
    app.get(path + '/:category/:id/delete', controller._delete)
    // update
    app.put(path + '/:category/:id', controller.update)
    // create
    app.post(path + '/:category', controller.create)
    // search
    app.get(path + '/:category/search/:q', controller.search)
  }
  // mount the app
  parent.use(app);
};
