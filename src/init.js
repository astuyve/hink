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
      , schema = new Schema({ }) //any: Schema.Types.Mixed })
      , m = mongoose.model(name, schema) // register the collection
    switch (obj.type) {
      case 'text':
        var controller = new TextController(m)
      case 'file':
        var controller = new FileController(m)
      default:
        controller = new TextController(m)
    }
    var app = express()
      , path = '/' + obj.name
    console.log('\n %s: %s', obj.name, obj.type);
    console.log('   - registered ' + name)

    // bind is here to get the myCollection instance from the *Controller
    // cat_list
    parent.get(path, controller.cat_list.bind(controller))
    // list
    parent.get(path + '/:category', controller.list.bind(controller))
    // show
    parent.get(path + '/:category/:id', controller.show.bind(controller))
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
