// index.js
var mongoose = require('mongoose')

module.exports = function(app, config) {
  app.get('/', function(req, res) {
    endpoints = []
    for (var k in config.manifest) {
      endpoints.push(config.manifest[k].name)
    }
    res.json(endpoints)
  })

  // general search
  app.get('/search/:query', function(req, res) {
    query = req.params.query
    console.log('searching for ' + query)
    results = []
    model_names = []
    for (var k in config.manifest) {
      name = config.manifest[k].name
      model_names.push(toTitleCase(name))
    }
    results = aggregate_search(query, results, model_names)
    res.json(results)
  })
  // end module
}

// recursively collect results of query, via a list of models that dwindles
// each step of the recursion
//XXX not working yet
var aggregate_search = function(query, results, models) {
  console.log(results)
  if (models.length > 0){
    m = mongoose.model(models.pop())
    result =  general_search(query, m)
    console.log(result)
    results.push(result)
    aggregate_search(query, results, models)
  }
  return results
}

var general_search = function(query, model) {
  var regex = new RegExp(query, 'i')  // ignore case
  model.find({ title: regex}, function(err, docs) {
    console.log(docs)
    return docs
  })
}

var toTitleCase = function(str){
  return str.replace(/\w\S*/g, function(txt){
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
