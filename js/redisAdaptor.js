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

  if(process.env.REDIS_CHECK === "local") {
    client = redis.createClient();
  } else if (process.env.REDIS_URL) {
    var redisURL = url.parse(process.env.REDIS_URL);
    client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
    client.auth(redisURL.auth.split(":")[1]);
  } else {
    client = redis.createClient();
  }

  return {

    create: function(formData, callback) {
      client.select(0, function() {
          client.hmset(addID(), formData, function(err){
            callback(err);
          });
        }
      );
    }, //database 0 is for our metadata

    addAnalytics: function(data, callback) {
      client.select(1, function() {
          client.hmset(data.time, data, function(err){
            callback(err);
          });
        }
      );
    }, //database 1 is for analytics

    read: function(db, callback) {
      var fileLoad = [];
      var dbKeys =[];

      var redisCallback = function(err, data) {
        if(err) {
          console.log(err);
        } else {
          fileLoad.push(data);
          if(fileLoad.length === dbKeys.length) {
            callback(fileLoad);
          }
        }
      };

      var scan = function(x) {
        client.scan(x, function(err, data) {
          if(err) {
            console.log(err);
          } else {
            dbKeys = dbKeys.concat(data[1]);
            if(data[0] === "0") {
              for(var i = 0; i < dbKeys.length; i++) {
                client.hgetall(dbKeys[i], redisCallback);
              }
            } else {
              scan(data[0]);
            }
          }
        });
      };

      client.select(db, function() {
        scan(0);
      });
    },

    delete: function(time, callback) {
      client.del(time, function(err, reply) {
        callback(reply);
      });
    }

  };

};

module.exports = redisAdaptor;
