// Image Controller

var mongoose = require('mongoose')
  , db = mongoose.connection
  , Image = db.model('Note')
  , FileController = require('./../../src/fileController').FileController

var control = new FileController(Image)

exports.cat_list = control.cat_list.bind(control)

exports.search = control.search.bind(control)

exports.list = control.list.bind(control)

exports.create = control.create.bind(control)

exports.show = control.show.bind(control)

exports.update = control.update.bind(control)

exports.delete = control._delete.bind(control)


