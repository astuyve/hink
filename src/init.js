var express = require('express')
  , config = require('../config')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , TextController = require('./textController').TextController
  , FileController = require('./fileController').FileController

module.exports = function(parent){
  manifest = config.manifest
  for (var name in manifest) {
    var obj = manifest[name]
      , schema = new Schema({ any: Schema.Types.Mixed })
      , controller
    mongoose.model(name, schema) // register the collection
    m = mongoose.model(name)
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
    parent.get(path, controller.cat_list.bind(controller))
    // show
    parent.get(path + '/:category/:id', controller.show.bind(controller))
    // list
    parent.get(path + '/:category/:id', controller.list.bind(controller))
    // delete
    parent.del(path + '/:category/:id', controller.destroy.bind(controller))
    // update
    parent.put(path + '/:category/:id', controller.update.bind(controller))
    // create
    parent.post(path + '/:category', controller.create.bind(controller))
    // search
    parent.get(path + '/:category/search/:q', controller.search.bind(controller))
  }
  // mount the app
  parent.use(app);
}
