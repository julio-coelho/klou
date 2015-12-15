'use strict';

var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectId;
var _ = require('underscore');
var appointment = require('./appointment');

exports.findById = function(_id, callback) {

  var collection = mongodb.DB.collection('professional');

  var query = {'_id': new ObjectId(_id)};

  collection.find(query).limit(1).next(function(err, result) {
    if (err) callback(err, null);
    callback(err, result);
  });
};

exports.findOrCreate = function(professional, callback) {

  var collection = mongodb.DB.collection('professional');

  var query = {'facebook_uid': professional.facebook_uid};
  var options = {'upsert': true, 'returnOriginal': false};

  //default schedule
  professional.schedule = [
    {'dayOfWeek': 1, 'shifts': [{'start': '08:00', 'end': '12:00'}, {'start': '13:00', 'end': '17:00'}]},
    {'dayOfWeek': 2, 'shifts': [{'start': '08:00', 'end': '12:00'}, {'start': '13:00', 'end': '17:00'}]},
    {'dayOfWeek': 3, 'shifts': [{'start': '08:00', 'end': '12:00'}, {'start': '13:00', 'end': '17:00'}]},
    {'dayOfWeek': 4, 'shifts': [{'start': '08:00', 'end': '12:00'}, {'start': '13:00', 'end': '17:00'}]},
    {'dayOfWeek': 5, 'shifts': [{'start': '08:00', 'end': '12:00'}, {'start': '13:00', 'end': '17:00'}]},
    {'dayOfWeek': 6, 'shifts': [{'start': '09:00', 'end': '12:00'}, {'start': '14:00', 'end': '19:00'}]},
    {'dayOfWeek': 7, 'shifts': []}
  ];

  //default services
  professional.services = [
    { '_id': 1, 'name' : 'Mão Simples', 'active' : false, 'price' : 0, 'duration' : 20, 'interval' : 10 },
    { '_id': 2, 'name' : 'Pé Simples', 'active' : false, 'price' : 0, 'duration' : 30, 'interval' : 10 },
    { '_id': 3, 'name' : 'Mão Porcelana', 'active' : false, 'price' : 0, 'duration' : 60, 'interval' : 10 },
    { '_id': 4, 'name' : 'Mão Postiça', 'active' : false, 'price' : 0, 'duration' : 60, 'interval' : 10 },
    { '_id': 5, 'name' : 'Mão NailArt', 'active' : false, 'price' : 0, 'duration' : 60, 'interval' : 10 }
  ];

  //default packages
  professional.packages = [
    { '_id': new ObjectId(), 'duration': 50, 'interval': 10, 'active': false, 'price': 0,
      'services': [ { 'name': 'Mão Simples', 'quantity': 4 },
                    { 'name': 'Pé Simples', 'quantity': 2 } ]
    }
  ];

  //created
  professional.created = +new Date();

  //updated
  professional.updated = +new Date();

  //active
  professional.active = true;

  var newProfessional = {'$setOnInsert': professional};

  collection.findOneAndUpdate(query, newProfessional, options, function(err, result) {
    if (err) callback(err, null);

    appointment.create(result.value._id, new Date().getFullYear(), new Date().getMonth(), function (err_1, result_1) {
      if (err_1) callback(err_1, null);

      callback(err_1, result.value);
    });
  });
};

exports.delete = function(_id, callback) {

  var collection = mongodb.DB.collection('professional');

  var query = {'_id': new ObjectId(_id)};

  collection.deleteOne(query, function(err, result) {
    if (err) callback(err, null);
    callback(err, result.deletedCount);
  });
};

exports.saveService = function(_id, service, callback) {

  var collection = mongodb.DB.collection('professional');

  var query = {'_id': new ObjectId(_id), 'services': {'$elemMatch': {'_id': service._id}}};
  var update = {'$set': {'services.$': service, 'updated': +new Date()}};
  var options = {'returnOriginal': false, 'projection': {'services': true}};

  collection.findOneAndUpdate(query, update, options, function(err, result) {
    if (err) callback(err, null);
    callback(err, result.value);
  });
};

exports.saveSchedule = function(_id, schedule, callback) {

  var collection = mongodb.DB.collection('professional');

  var query = {'_id': new ObjectId(_id), 'schedule': {'$elemMatch': {'dayOfWeek': schedule.dayOfWeek}}};
  var update = {'$set': {'schedule.$': schedule, 'updated': +new Date()}};
  var options = {'returnOriginal': false, 'projection': {'schedule': true}};

  collection.findOneAndUpdate(query, update, options, function(err, result) {
    if (err) callback(err, null);
    callback(err, result.value);
  });
};

exports.savePackage = function(_id, pkg, callback) {

  var collection = mongodb.DB.collection('professional');

  var _package = _.clone(pkg);

  var query = undefined;
  var update = undefined;
  var options = undefined;

  if (pkg._id) {
    _package.updated = +new Date();
    _package._id = new ObjectId(pkg._id);

    query = {'_id': new ObjectId(_id), 'packages': {'$elemMatch': {'_id': _package._id}}};
    update = {'$set': {'packages.$': _package, 'updated': +new Date()}};
    options = {'returnOriginal': false, 'projection': {'packages': true}};

  } else {
    _package.updated = +new Date();
    _package.created = +new Date();
    _package._id = new ObjectId();

    query = {'_id': new ObjectId(_id)};
    update = {'$push': {'packages': _package}, '$set': {'updated': +new Date()}};
    options = {'returnOriginal': false, 'projection': {'packages': true}};

  }

  collection.updateOne(query, update, options, function(err, result) {
    if (err) callback(err, null);

    callback(err, _package._id);
  });
};

exports.save = function(professional, callback) {

  var collection = mongodb.DB.collection('professional');

  var query = {'_id': new ObjectId(professional._id)};
  var options = {'returnOriginal': false};

  professional._id = new ObjectId(professional._id);
  professional.updated = +new Date();

  collection.findOneAndUpdate(query, professional, options, function(err, result) {
    if (err) callback(err, null);
    callback(err, result.value);
  });
};
