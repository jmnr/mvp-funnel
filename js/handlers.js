var redis = require('./redisAdaptor')({connection: require('redis')});

function handlers() {
  return {

    sendData: function (request, reply) {
      // reply.view("index", {name: "michelle!", questionOne: "What are you looking fooor?"});
      redis.create(request.payload, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          reply(data);
          console.log("Added to redis");
        }
      });
    },

    settingsSubmit: function (request, reply) {
      redis.set("test123", request.payload, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          reply(data);
          console.log("Settings changed");
        }
      });
    },

    handlebarsGet: function (request, reply) {
      redis.get("test123", function(err, data) {
        if (err) {
          console.log(err);
        } else {
          reply.view("index", {name: "michelle", question: "hey?"});
        }
      });
    },

    getSettings: function (request, reply) {
      redis.get("test123", function(err, data) {
        if (err) {
          console.log(err);
        } else {
          reply.view("settings", {input: data});
        }
      });
    }

  };
}

module.exports = handlers;
