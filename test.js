var request = require('supertest');
var app = require('./app');

describe('Request to authentication service', function(){

  this.timeout(5000);

  var _token = undefined;

  it('Returns a 200 status code', function(done){

    request(app)
    .post('/auth')
    .set('Content-Type', 'application/json')
    .send({'access_token': 'CAAM5Ey1sa0gBAK3VrFjmZAG9TTOLlSQhrjvOXQgF5B7jrjzsTH6f9ogXbe8eQYuxiGBohCUCZAoS1ZByfDYaQtWZBGQjAT54FitYXqcZAbyOL3ZAp1aPh9DuniLkZAboEwwuwKm9lRgZBceQscAOtsWbEIv6oOW1uhUFARW7aKyHK6YywJIq4wcV', 'profile': 'professional'})
    .expect(200, done);
  });

});

describe('Requests to the professional services', function(){

  var _id = undefined;

  it('post - Returns a 201 status code', function(done){

    request(app)
    .post('/professional')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjU2NDBjMzMyYjU5OTM3NTEyMGFlMjYwOCI.npPlRjlsT8GJhKyXHx-E43EocDp44KMhFBs3A7GyT34')
    .send({ "name": "Mock",
            "lastName": "Test",
            "facebook_uid": 12345
          })
    .expect(201)
    .end(function(err, response) {
      _id = response.body._id;
      done();
    })
  });

  it('put  - Returns a 201 status code', function(done){

    request(app)
    .put('/professional')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjU2NDBjMzMyYjU5OTM3NTEyMGFlMjYwOCI.npPlRjlsT8GJhKyXHx-E43EocDp44KMhFBs3A7GyT34')
    .send({ "_id": _id,
            "name": "mockprofessional",
            "lastName": "Test",
            "facebook_uid": 12345
          })
    .expect(201, /mockprofessional/i, done);

  });

  it('get  - Returns a 200 status code', function(done){

    request(app)
    .get('/professional/' + _id)
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjU2NDBjMzMyYjU5OTM3NTEyMGFlMjYwOCI.npPlRjlsT8GJhKyXHx-E43EocDp44KMhFBs3A7GyT34')
    .expect(200, /mockprofessional/i,  done);

  });

  describe('Requests to services', function() {

    var services_id;

    it('post - Returns a 201 status code', function(done){

      request(app)
      .post('/services')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjU2NDBjMzMyYjU5OTM3NTEyMGFlMjYwOCI.npPlRjlsT8GJhKyXHx-E43EocDp44KMhFBs3A7GyT34')
      .send({ "_id": _id,
              "services":
              {
                "name": "Mão Simples",
                "active": true,
                "price": 0,
                "duration": 30,
                "interval": 10
              }
            })
      .expect(201)
      .end(function(err, response) {
        services_id = response.body.services[0]._id;
        done();
      });

    });

    it('put  - Returns a 201 status code', function(done){

      request(app)
      .put('/services')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjU2NDBjMzMyYjU5OTM3NTEyMGFlMjYwOCI.npPlRjlsT8GJhKyXHx-E43EocDp44KMhFBs3A7GyT34')
      .send({ "_id": _id,
              "services":
              {
                "_id": services_id,
                "name": "mockservice",
                "active": false,
                "price": 0,
                "duration": 30,
                "interval": 10
              }
            })
      .expect(201, /mockservice/i, done);

    });

    it('get  - Returns a 200 status code', function(done){

      request(app)
      .get('/services/' + _id)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjU2NDBjMzMyYjU5OTM3NTEyMGFlMjYwOCI.npPlRjlsT8GJhKyXHx-E43EocDp44KMhFBs3A7GyT34')
      .expect(200, /mockservice/i,  done);

    });

  });

  describe('Requests to packs', function() {

    var packs_id;

    it('post - Returns a 201 status code', function(done){

      request(app)
      .post('/packs')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjU2NDBjMzMyYjU5OTM3NTEyMGFlMjYwOCI.npPlRjlsT8GJhKyXHx-E43EocDp44KMhFBs3A7GyT34')
      .send({ "_id": _id,
              "packs":
              {
                "duration": 50,
                "interval": 10,
                "active": false,
                "price": 99,
                "services": [
                  {
                    "name": "Mão Simples",
                    "quantity": 4
                  },
                  {
                    "name": "Pé Simples",
                    "quantity": 2
                  }
                ]
              }
            })
      .expect(201)
      .end(function(err, response) {
        packs_id = response.body.packs[0]._id;
        done();
      });

    });

    it('put  - Returns a 201 status code', function(done){

      request(app)
      .post('/packs')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjU2NDBjMzMyYjU5OTM3NTEyMGFlMjYwOCI.npPlRjlsT8GJhKyXHx-E43EocDp44KMhFBs3A7GyT34')
      .send({ "_id": _id,
              "packs":
              {
                "_id": packs_id,
                "duration": 50,
                "interval": 10,
                "active": true,
                "price": 99,
                "services": [
                  {
                    "name": "Mão Simples",
                    "quantity": 4
                  },
                  {
                    "name": "Pé Simples",
                    "quantity": 2
                  }
                ]
              }
            })
      .expect(201, /"active":true/i, done);

    });

    it('get  - Returns a 200 status code', function(done){

      request(app)
      .get('/packs/' + _id)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjU2NDBjMzMyYjU5OTM3NTEyMGFlMjYwOCI.npPlRjlsT8GJhKyXHx-E43EocDp44KMhFBs3A7GyT34')
      .expect(200, /"active":true/i,  done);

    });

  });

  describe('Requests to schedule', function() {

    it('post - Returns a 201 status code', function(done){

      request(app)
      .post('/schedule')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjU2NDBjMzMyYjU5OTM3NTEyMGFlMjYwOCI.npPlRjlsT8GJhKyXHx-E43EocDp44KMhFBs3A7GyT34')
      .send({ "_id": _id,
              "schedule":
              {
               "dayOfWeek": 0,
               "shifts": [
                 {
                   "start": "08:00",
                   "end": "12:00"
                 },
                 {
                   "start": "13:00",
                   "end": "17:00"
                 }
               ]
             }
            })
      .expect(201)
      .end(function(err, response) {
        done();
      });

    });

    it('put  - Returns a 201 status code', function(done){

      request(app)
      .post('/schedule')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjU2NDBjMzMyYjU5OTM3NTEyMGFlMjYwOCI.npPlRjlsT8GJhKyXHx-E43EocDp44KMhFBs3A7GyT34')
      .send({ "_id": _id,
              "schedule":
              {
               "dayOfWeek": 0,
               "shifts": [
                 {
                   "start": "08:00",
                   "end": "12:00"
                 },
                 {
                   "start": "14:00",
                   "end": "17:00"
                 }
               ]
             }
            })
      .expect(201, /"dayOfWeek":0/i, done);

    });

    it('get  - Returns a 200 status code', function(done){

      request(app)
      .get('/schedule/' + _id)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjU2NDBjMzMyYjU5OTM3NTEyMGFlMjYwOCI.npPlRjlsT8GJhKyXHx-E43EocDp44KMhFBs3A7GyT34')
      .expect(200, /"dayOfWeek":0/i,  done);

    });

  });

  after('delete - Returns a 204 status code', function(done){

    request(app)
    .delete('/professional')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjU2NDBjMzMyYjU5OTM3NTEyMGFlMjYwOCI.npPlRjlsT8GJhKyXHx-E43EocDp44KMhFBs3A7GyT34')
    .send({"_id": _id})
    .expect(204, done);

  });

});

describe('Requests to the customer services', function(){

  var _id = undefined;

  it('Returns a 201 status code', function(done){

    request(app)
    .put('/customer')
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
    .get('/customer/' + _id)
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjU2NDBjMzMyYjU5OTM3NTEyMGFlMjYwOCI.npPlRjlsT8GJhKyXHx-E43EocDp44KMhFBs3A7GyT34')
    .expect(200, /mock/i,  done);

  });

  it('Returns a 204 status code', function(done){

    request(app)
    .delete('/customer')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjU2NDBjMzMyYjU5OTM3NTEyMGFlMjYwOCI.npPlRjlsT8GJhKyXHx-E43EocDp44KMhFBs3A7GyT34')
    .send({"_id": _id})
    .expect(204, done);

  });

});
