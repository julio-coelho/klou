var request = require('supertest');
var app = require('./app');

var _token = undefined;

describe('Request to authentication service', function(){

  it('Returns a 200 status code', function(done){

    request(app)
    .post('/auth')
    .set('Content-Type', 'application/json')
    .send({'access_token': 'CAAM5Ey1sa0gBAK3VrFjmZAG9TTOLlSQhrjvOXQgF5B7jrjzsTH6f9ogXbe8eQYuxiGBohCUCZAoS1ZByfDYaQtWZBGQjAT54FitYXqcZAbyOL3ZAp1aPh9DuniLkZAboEwwuwKm9lRgZBceQscAOtsWbEIv6oOW1uhUFARW7aKyHK6YywJIq4wcV'})
    .expect(200, done);
  });

});

describe('Requests to the professional services', function(){

  var _id = undefined;

  it('Returns a 201 status code', function(done){

    request(app)
    .put('/professional')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjU2NDBjMzMyYjU5OTM3NTEyMGFlMjYwOCI.npPlRjlsT8GJhKyXHx-E43EocDp44KMhFBs3A7GyT34')
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
    .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjU2NDBjMzMyYjU5OTM3NTEyMGFlMjYwOCI.npPlRjlsT8GJhKyXHx-E43EocDp44KMhFBs3A7GyT34')
    .expect(200, /mock/i,  done);

  });

  it('Returns a 204 status code', function(done){

    request(app)
    .delete('/professional')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjU2NDBjMzMyYjU5OTM3NTEyMGFlMjYwOCI.npPlRjlsT8GJhKyXHx-E43EocDp44KMhFBs3A7GyT34')
    .send({"_id": _id})
    .expect(204, done);

  });

});
