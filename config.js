/*
** Configuration settings 
*/

exports.site = "localhost";
exports.port = 3000;
exports.errorPages = true;
exports.tests = false; // no tests written yet
exports.staticDir = './public';
exports.dburi = 'hink';
switch(process.env.NODE_ENV) {
  case 'production':
    exports.dburi = 'hink';
    exports.site = "localhost";
    exports.port = 80;
    exports.errorPages = false;
    console.log('running production');
    break;
  // if needed, staging goes here
  default:
    exports.dburi = 'dev'
    exports.site = "localhost";
    exports.errorPages=true;
    console.log('Running dev on port ' + exports.port);
    break;
};
