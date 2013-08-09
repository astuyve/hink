var app = require('../index')
  , request = require('./support/http')
  , assert  = require('assert');

describe('app', function(){
  describe('.get("/")', function(){
    it('should be status 200', function(done) {

      request(app)
        .get('/')
        .expect(200, done)
    });
  });
})
