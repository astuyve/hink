var request = require('./support/http')
  , assert  = require('assert')
  , mongoose = require('mongoose')
  , config = require('./../config')
  , models = require('./../models')

describe('api', function(){
  process.env.NODE_ENV = 'test'
  app = require('../index')
  var aNote = new models.Note({category: "foo", title: "foo", content: "bar"})
    , aLink = new models.Link({category: "foo", title: "baz", content: "qaz"})
    , anImage = new models.Image({
          category: "foo"
        , title: "cat gif"
        , content: "a cat"})

  beforeEach(function(done){
    models.Note.remove({}, function() {})
    models.Link.remove({}, function() {})
    models.Image.remove({}, function() {})
    aNote.save(); aLink.save(); anImage.save();
    done()
  })
  url = 'localhost:' + config.port

  describe('root', function(){
    it('should be status 200', function(done) {
      request(app)
      .get('/')
      .expect(200, done)
    })
  })

  describe('list', function(){
    it('should return a list of categories', function(){
      request(app)
      .get('/', function(res, body) {
        res.statusCode.should.be(200)
        var obj = JSON.parse(body)
        obj.should.be(["foo"])
      })
    })
    it('should return json string of results', function(){
      request(app)
      .get('/note/foo', function(res, body) {
        res.statusCode.should.be(200)
        var obj = JSON.parse(body)
        obj.should.have.property('title', aNote.title)
        obj.should.have.property('content', aNote.content)
      })
    })
  })

  describe('show', function(){
    it('should return the correct object based on ID', function(){
      request(app)
      .get('/link/foo' + aLink._id, function(res, body) {
        res.statusCode.should.be(200)
        var obj = JSON.parse(body)
        obj.should.have.property('title', aLink.title)
        obj.should.have.property('content', aLink.content)
      })
    })
  })

  describe('delete', function(){
    it('should delete the given item via ID', function(){
      request(app)
      .get('/link/foo' + aLink._id + '/delete', function(res, body) {
        res.statusCode.should.be(200)
        models.Link.find({}, function(err, docs) {
          docs.should.have.length(0)
        })
      })
    })
  })

  describe('update', function(){
    it('should update the given item via ID', function(){
      request(app)
      .put('/link/foo' + aLink._id, function(res, body) {
        res.statusCode.should.be(200)
        models.Link.find({}, function(err, docs) {
          docs.should.have.length(1)
        })
      })
    })
  })
  describe('create', function(){
    it('should create a new item', function(){
      data = {title: "new", content: "beep"}
      request(app)
      .post('/link/foo', data, function(res, body) {
        res.statusCode.should.be(200)
        models.Link.find({}, function(err, docs) {
          docs.should.have.length(2)
          docs.should.each.have.property('category', 'foo')
        })
      })
    })
  })

//end of app tests
})
