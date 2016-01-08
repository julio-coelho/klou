'use strict';

var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectId;
var _ = require('underscore');

exports.create = function(_id, schedule, callback) {

  var collection = mongodb.DB.collection('professional');

  var _schedule = _.clone(schedule);

  var now = +new Date();

  _schedule.updated = now;
  _schedule.created = now;

  var query = {'_id': new ObjectId(_id)};
  var update = {'$push': {'schedule': _schedule}, '$set': {'updated': now}};
  var options = {'returnOriginal': false, 'projection': {'schedule': true}};

  collection.findOneAndUpdate(query, update, options, function(err, result) {
    if (err) callback(err, null);
    callback(err, result.value);
  });
};

exports.retrieve = function(_id, callback) {

  var collection = mongodb.DB.collection('professional');

  var query = {'_id': new ObjectId(_id)};

  collection.find(query).limit(1).project({'schedule': true}).next(function(err, result) {
    if (err) callback(err, null);
    callback(err, result);
  });
};

exports.update = function(_id, schedule, callback) {

  var collection = mongodb.DB.collection('professional');

  var _schedule = _.clone(schedule);

  var now = +new Date();

  _schedule.updated = now;

  var query = {'_id': new ObjectId(_id), 'schedule': {'$elemMatch': {'dayOfWeek': _schedule.dayOfWeek}}};
  var update = {'$set': {'schedule.$': _schedule, 'updated': now}};
  var options = {'returnOriginal': false, 'projection': {'schedule': true}};

  collection.findOneAndUpdate(query, update, options, function(err, result) {
    if (err) callback(err, null);
    callback(err, result.value);
  });
};
