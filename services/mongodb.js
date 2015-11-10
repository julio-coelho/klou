'use strict';

var mongodb = require('mongodb');
var client = mongodb.MongoClient;

exports.connect = function() {

  if (mongodb.DB) {
    return mongodb.DB;
  }

  var connectionString = undefined;

  switch(process.env.NODE_ENV) {
    case 'production':
      connectionString = process.env.MONGOLAB_URI;
      break;
    case 'test':
      connectionString = 'mongodb://localhost:27017/test';
      break;
    default:
      connectionString = 'mongodb://localhost:27017/development';
  }

  client.connect(connectionString, function(err, database) {
    if (err) throw err;

    console.log('mongodb-server running on ' + (process.env.NODE_ENV || 'development') + ' environment');

    database.on('error', function(err) {
      console.log('database error - ' + err);
      throw err;
    });

    mongodb.DB = database;
  });
};
