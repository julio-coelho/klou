'use strict';

var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectId;
var _ = require('underscore');
var appointment = require('./appointment');

exports.create = function(professional, callback) {

  var collection = mongodb.DB.collection('professional');

  var query = {'facebook_uid': professional.facebook_uid};
  var options = {'upsert': true, 'returnOriginal': false};

  var now = +new Date();

  //default schedule
  professional.schedule = [
    {'dayOfWeek': 0, 'shifts': [], 'created' : now, 'updated' : now},
    {'dayOfWeek': 1, 'shifts': [{'start': '08:00', 'end': '12:00'}, {'start': '13:00', 'end': '17:00'}], 'created' : now, 'updated' : now},
    {'dayOfWeek': 2, 'shifts': [{'start': '08:00', 'end': '12:00'}, {'start': '13:00', 'end': '17:00'}], 'created' : now, 'updated' : now},
    {'dayOfWeek': 3, 'shifts': [{'start': '08:00', 'end': '12:00'}, {'start': '13:00', 'end': '17:00'}], 'created' : now, 'updated' : now},
    {'dayOfWeek': 4, 'shifts': [{'start': '08:00', 'end': '12:00'}, {'start': '13:00', 'end': '17:00'}], 'created' : now, 'updated' : now},
    {'dayOfWeek': 5, 'shifts': [{'start': '08:00', 'end': '12:00'}, {'start': '13:00', 'end': '17:00'}], 'created' : now, 'updated' : now},
    {'dayOfWeek': 6, 'shifts': [{'start': '09:00', 'end': '12:00'}, {'start': '14:00', 'end': '19:00'}], 'created' : now, 'updated' : now}
  ];

  //default services
  professional.services = [
    { '_id': new ObjectId(), 'name' : 'Mão Simples', 'active' : false, 'price' : 0, 'duration' : 30, 'interval' : 5, 'created' : now, 'updated' : now},
    { '_id': new ObjectId(), 'name' : 'Pé Simples', 'active' : false, 'price' : 0, 'duration' : 30, 'interval' : 5, 'created' : now, 'updated' : now},
    { '_id': new ObjectId(), 'name' : 'Mão Porcelana', 'active' : false, 'price' : 0, 'duration' : 30, 'interval' : 5, 'created' : now, 'updated' : now},
    { '_id': new ObjectId(), 'name' : 'Mão Postiça', 'active' : false, 'price' : 0, 'duration' : 30, 'interval' : 5, 'created' : now, 'updated' : now},
    { '_id': new ObjectId(), 'name' : 'Mão NailArt', 'active' : false, 'price' : 0, 'duration' : 30, 'interval' : 5 , 'created' : now, 'updated' : now}
  ];

  //default packs
  professional.packs = [
    { '_id': new ObjectId(), 'duration': 60, 'interval': 5, 'active': false, 'price': 0, 'created' : now, 'updated' : now,
      'services': [ { 'name': 'Mão Simples', 'quantity': 4 },
                    { 'name': 'Pé Simples', 'quantity': 2 } ]
    }
  ];

  //created
  professional.created = now;

  //updated
  professional.updated = now;

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

exports.retrieve = function(_id, callback) {

  var collection = mongodb.DB.collection('professional');

  var query = {'_id': new ObjectId(_id)};

  collection.find(query).limit(1).next(function(err, result) {
    if (err) callback(err, null);
    callback(err, result);
  });
};

exports.update = function(professional, callback) {

  var collection = mongodb.DB.collection('professional');

  var now = +new Date();

  var query = {'_id': new ObjectId(professional._id)};
  var options = {'returnOriginal': false};

  professional._id = new ObjectId(professional._id);
  professional.updated = now;

  collection.findOneAndUpdate(query, professional, options, function(err, result) {
    if (err) callback(err, null);
    callback(err, result.value);
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
