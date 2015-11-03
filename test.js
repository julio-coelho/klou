var request = require('supertest');
var app = require('./app');

describe('Requests to the root path', function(){

  it('Returns a 404 status code', function(done){

    request(app)
    .get('/')
    .expect(404, done);

  });

});

describe('Requests to the professional services', function(){

  var _id = undefined;

  it('Returns a 201 status code', function(done){

    request(app)
    .put('/professional')
    .set('Content-Type', 'application/json')
    .send({"name": "Mock", "lastName": "Test", "facebook_uid": 12345})
    .expect(201)
    .end(function(err, response) {
      _id = response.body._id;
      done();
    })
  });

  it('Returns a 200 status code', function(done){

    request(app)
    .get('/professional?_id=' + _id)
    .set('Content-Type', 'application/json')
    .expect(200, /mock/i,  done);

  });

  it('Returns a 204 status code', function(done){

    request(app)
    .delete('/professional')
    .set('Content-Type', 'application/json')
    .send({"_id": _id})
    .expect(204, done);

  });

});
