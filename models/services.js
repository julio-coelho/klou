'use strict';

var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectId;
var _ = require('underscore');

exports.create = function(_id, service, callback) {

  var collection = mongodb.DB.collection('professional');

  var _service = _.clone(service);

  var now = +new Date();

  _service.updated = now;
  _service.created = now;
  _service._id = new ObjectId();

  var query = {'_id': new ObjectId(_id)};
  var update = {'$push': {'services': _service}, '$set': {'updated': now}};
  var options = {'returnOriginal': false, 'projection': {'_id': false, 'services': true}};

  collection.findOneAndUpdate(query, update, options, function(err, result) {
    if (err) callback(err, null);
    callback(err, result.value);
  });
};

exports.retrieve = function(_id, service, callback) {

  var collection = mongodb.DB.collection('professional');

  var query = {'_id': new ObjectId(_id), 'services': {'$elemMatch': {'_id': new ObjectId(service)}}};

  collection.find(query).project({'_id': false, 'services.$': true}).next(function(err, result) {
    if (err) callback(err, null);
    callback(err, result);
  });
};

exports.retrieveAll = function(_id, callback) {

  var collection = mongodb.DB.collection('professional');

  var query = {'_id': new ObjectId(_id)};

  collection.find(query).project({'_id': false, 'services': true}).next(function(err, result) {
    if (err) callback(err, null);
    callback(err, result);
  });
};

exports.update = function(_id, service, callback) {

  var collection = mongodb.DB.collection('professional');

  var _service = _.clone(service);

  var now = +new Date();

  _service.updated = now;
  _service._id = new ObjectId(service._id);

  var query = {'_id': new ObjectId(_id), 'services': {'$elemMatch': {'_id': _service._id}}};
  var update = {'$set': {'services.$': _service, 'updated': now}};
  var options = {'returnOriginal': false, 'projection': {'_id': false, 'services': true}};

  collection.findOneAndUpdate(query, update, options, function(err, result) {
    if (err) callback(err, null);
    callback(err, result.value);
  });
};
