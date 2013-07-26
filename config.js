/*
** Configuration settings 
** Needs production vs. development distinctions
*/

exports.SITE= "localhost";
exports.PORT = 3000;
exports.errorPages = true;
exports.tests = false; // no tests written yet
exports.staticDir = './public'
exports.DB_URI = 'test'
switch(process.env.NODE_ENV) {
  case 'production':
    exports.DB_URI = 'hink'
    exports.SITE = "localhost"
    exports.PORT = 80;
    exports.errorPages = false;
    console.log('running on production server')
    break;
  // if needed, staging goes here
  default:
    exports.DB_URI = 'test'
    exports.SITE = "localhost"
    exports.errorPages=true;
    console.log('running dev')
    break;
};
