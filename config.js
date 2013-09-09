/*
** Configuration settings 
*/

require('js-yaml')
// extract the model manifest
var doc = require('./manifest.yaml')
exports.manifest = doc

exports.site = "localhost";
exports.errorPages = true;
exports.tests = true;
exports.dburi = 'hink';
exports.verbose = false
exports.staticDir = './public';
exports.imageDir  = './public/files/'
switch(process.env.NODE_ENV) {
  case 'production':
    exports.dburi = 'hink';
    exports.errorPages = false;
    console.log('running production');
    break;
  case 'test':
    exports.dburi = 'test'
    exports.errorPages=true;
    break;
  default:
    exports.dburi = 'dev'
    exports.verbose = true
    console.log('Running dev');
    break;
};
