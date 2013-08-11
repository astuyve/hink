// file: generic_control.js
// The goal of generic controller is to establish what models are registered
// with mongo and create appropriate control/routes for them based on what we
// know about the schema.

// Establish a list of endpoints from the models
var models = require('./../models')
var endpoints = []
for (var k in models) {
  if (k != 'db') {
    endpoints.push(k.toLowerCase())
  }
}
exports.endpoints = endpoints

// I'm not using camel case because it's harder to read.
function Text_Ctrl() {}
/*
 * This should be used by each controller which deals with text data
     GET list
     POST create
     GET search
     GET show
     GET edit
     PUT update
 */
Text_Ctrl.prototype.list = function(req, res, next) {
  // etc
}

function File_Ctrl() {}
/*
 * This should be used by each controller which deals with files.
 * methods to provide:
 * GET list
 * POST create
 * GET search
 */

File_Ctrl.prototype.list = function(req, res, next) {
  // etc
}



