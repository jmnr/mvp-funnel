var redis = require('./redisAdaptor')({connection: require('redis')});

function handlers() {
  return {

    sendData: function (request, reply) {
      redis.create(request.payload, function(err, data) {
        reply(data);
      });
    },

    handlebarsGet: function (request, reply) {
      reply.view("index", {home: "world!"});
    }

  };
}

module.exports = handlers;