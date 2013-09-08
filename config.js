/*
** Configuration settings 
*/

require('js-yaml')
var doc = require('./models.yaml')
exports.manifest = doc

exports.site = "localhost";
exports.port = 3000;
exports.errorPages = true;
exports.tests = true;
exports.staticDir = './public';
exports.imageDir  = './public/files/'
exports.dburi = 'hink';
switch(process.env.NODE_ENV) {
  case 'production':
    exports.dburi = 'hink';
    exports.site = "localhost";
    exports.port = 80;
    exports.errorPages = false;
    exports.verbose = false
    console.log('running production');
    break;
  case 'test':
    exports.dburi = 'test'
    exports.site = "localhost";
    exports.verbose = true
    exports.errorPages=true;
    break;
  default:
    exports.dburi = 'dev'
    exports.site = "localhost";
    exports.verbose = true
    exports.errorPages=true;
    console.log('Running dev on port ' + exports.port);
    break;
};
