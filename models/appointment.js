'use strict';

var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectId;
var _ = require('underscore');
var dateUtil = require('./../services/date-util');

exports.findById = function(_id, callback) {

  var collection = mongodb.DB.collection('appointment');

  var query = {'_id': new ObjectId(_id)};

  collection.find(query).limit(1).next(function(err, result) {
    if (err) callback(err, null);
    callback(err, result);
  });
};

exports.insert = function(appointment, callback) {

  var collection = mongodb.DB.collection('appointment');

  //professional
  appointment.professional._id = new ObjectId(appointment.professional._id);

  //customer
  appointment.customer._id = new ObjectId(appointment.customer._id);

  //created
  appointment.created = +new Date();

  //updated
  appointment.updated = +new Date();

  collection.insertOne(appointment, function(err, result) {
    if (err) callback(err, null);
    callback(err, result.insertedId);
  });
};

exports.save = function(appointment, callback) {

  var collection = mongodb.DB.collection('appointment');
  var query = {'_id': new ObjectId(appointment._id)};
  var options = {'returnOriginal': false};

  appointment._id = new ObjectId(appointment._id);
  appointment.updated = +new Date();

  collection.findOneAndUpdate(query, appointment, options, function(err, result) {
    if (err) callback(err, null);
    callback(err, result.value);
  });
};

exports.delete = function(_id, callback) {

  var collection = mongodb.DB.collection('appointment');

  var query = {'_id': new ObjectId(_id)};

  collection.deleteOne(query, function(err, result) {
    if (err) callback(err, null);
    callback(err, result.deletedCount);
  });
};

exports.create = function(_id, year, month, callback) {

  var collection = mongodb.DB.collection('appointment');

  var _month = { year: year, month: month, available: 0, days: [] };

  for (var d = 0; d < dateUtil.getDaysInMonth(year, month); d++) {

    _month.days[d] = {};
    _month.days[d].hours = [];
    _month.days[d].available = 0;

    for (var h = 0; h < 24; h++) {

      _month.days[d].hours[h] = {};
      _month.days[d].hours[h].available = 6 * 10;
      _month.days[d].hours[h].pieces = [];

      _month.days[d].available += _month.days[d].hours[h].available;
    };

    _month.available += _month.days[d].available;
  };

  var query = {'professional._id': new ObjectId(_id)};
  var options = {'upsert': true, 'returnOriginal': false};

  //Upsert Entity
  var appointment = {};
  appointment.professional = {_id: new ObjectId(_id)};
  appointment.created = +new Date();

  var update = {'$push': {'months': [_month] },
                '$set': {'updated': +new Date()},
                '$setOnInsert': appointment};

  collection.updateOne(query, update, options, function (err, result) {

    if (err) callback(err, null);
    callback(err, result);
  });

};
