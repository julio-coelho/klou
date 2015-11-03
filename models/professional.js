'use strict';

var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectId;

exports.findById = function(_id, callback) {

  var collection = mongodb.DB.collection('professional');

  var query = {'_id': new ObjectId(_id)};

  collection.find(query).limit(1).next(function(err, result) {
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

  //created
  professional.created = +new Date();

  //updated
  professional.updated = +new Date();

  //active
  professional.active = true;

  var newProfessional = {'$setOnInsert': professional};

  collection.findOneAndUpdate(query, newProfessional, options, function(err, result) {
   callback(err, result.value);
  });
};

exports.delete = function(_id, callback) {

  var collection = mongodb.DB.collection('professional');

  var query = {'_id': new ObjectId(_id)};

  collection.deleteOne(query, function(err, result) {
   callback(err, result.deletedCount);
  });
};

exports.saveService = function(_id, service, callback) {

  var collection = mongodb.DB.collection('professional');

  var query = {'_id': new ObjectId(_id), 'services': {'$elemMatch': {'_id': service._id}}};
  var update = {'$set': {'services.$': service, 'updated': +new Date()}};
  var options = {'returnOriginal': false, 'projection': {'services': true}};

  collection.findOneAndUpdate(query, update, options, function(err, result) {
    callback(err, result.value);
  });
};

exports.saveSchedule = function(_id, schedule, callback) {

  var collection = mongodb.DB.collection('professional');

  var query = {'_id': new ObjectId(_id), 'schedule': {'$elemMatch': {'dayOfWeek': schedule.dayOfWeek}}};
  var update = {'$set': {'schedule.$': schedule, 'updated': +new Date()}};
  var options = {'returnOriginal': false, 'projection': {'schedule': true}};

  collection.findOneAndUpdate(query, update, options, function(err, result) {
    callback(err, result.value);
  });
};

exports.save = function(professional, callback) {

  var collection = mongodb.DB.collection('professional');

  var query = {'_id': new ObjectId(professional._id)};
  var options = {'returnOriginal': false};

  professional._id = new ObjectId(professional._id);
  professional.updated = +new Date();

  collection.findOneAndUpdate(query, professional, options, function(err, result) {
    callback(err, result.value);
  });
};
