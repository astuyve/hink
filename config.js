/*
** Configuration settings 
*/

exports.site = "localhost";
exports.port = 8080;
exports.errorPages = true;
exports.tests = false; // no tests written yet
exports.staticDir = './public'
exports.dburi = 'hink-test';
switch(process.env.NODE_ENV) {
  case 'production':
    exports.dburi = 'hink'
    exports.site = "localhost"
    exports.port = 80;
    exports.errorPages = false;
    console.log('running on production server')
    break;
  // if needed, staging goes here
  default:
    exports.dburi = 'hink-test'
    exports.site = "localhost"
    exports.errorPages=true;
    console.log('running dev')
    break;
};
