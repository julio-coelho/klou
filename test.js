var request = require('supertest');
var app = require('./app');

describe('Requests to the professional services', function(){

  it('Returns a 200 status code', function(done){

    request(app)
    .get('/professional/1')
    .expect(200, done);

  });

  it('Returns a 201 status code', function(done){

    request(app)
    .post('/professional')
    .expect(201, done);

  });

  it('Returns a 204 status code', function(done){

    request(app)
    .delete('/professional/1')
    .expect(204, done);

  });

});
