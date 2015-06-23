var redisAdaptor = function (config) {
  "use strict";

  var redis = config.connection;
  var client;
  var url = require('url');

  var addID = function() {
    var ID = "";
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i = 0; i < 10; i++) {
      ID += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return ID;
  };

  if (process.env.REDIS_URL) {
    var redisURL = url.parse(process.env.REDIS_URL);
    client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
    client.auth(redisURL.auth.split(":")[1]);
  } else {
    client = redis.createClient();
  }

  return {

    get: function(key, callback) {
      client.select(0, function() {
        client.hgetall(key, function(err, data){
          if(err) {
            throw err;
          } else {
            callback(err, data);
          }
        });
      });
    },

    set: function(key, value, callback) {
      client.select(0, function() {
        client.del(key, function() {
          client.hmset(key, value, function(err, data){
            if(err) {
              throw err;
            } else {
              callback(err, data);
            }
          });
        });
      });
    }

  };

};

module.exports = redisAdaptor;
