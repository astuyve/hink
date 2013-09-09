// index.js

module.exports = function(app, config) {
  app.get('/', function(req, res) {
    if (req.query.q) {
      results = general_search(req.query.q)
      res.json(results)
    } else {
      endpoints = []
      for (var k in config.manifest) {
        endpoints.push(config.manifest[k].name)
      }
      res.json(endpoints)
    }
  })
}

var general_search = function(query) {
  // search all endpoints for query q
  var results = []
  for (k in models) {
    obj = models[k]
    var m = mongoose.model(k)
    var regex = new RegExp(query, 'i')  // ignore case
    searchables = []
    obj.searchable.forEach(function(key) {
      searchables.append({key: regex})
    })

    m.find({ $or: searchables }, function(err, docs) {
      docs.forEach(function(doc) {
        if (doc !== []) {
          results.push(doc)
        }
      })
    })
  }
  return results
}
