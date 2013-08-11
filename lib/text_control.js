/* file: text_control.js
 *
 * This should be used by each controller which deals with text data to
 * establish the similar functionalities.  For example, there's no need to
 * define CRUD for every model since they're all very similar. 
 * methods to provide:
     GET list
     POST create
     GET search
     GET show
     GET edit
     PUT update
 */

var mongoose = require('./models').mongoose

console.log(mongoose.model)

