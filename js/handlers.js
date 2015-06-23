var redis = require('./redisAdaptor')({connection: require('redis')});

function handlers() {
  return {

    sendData: function (request, reply) {
      redis.create(request.payload, function(err, data) {
        reply(data);
      });
    },

    handlebarsGet: function (request, reply) {
      reply.view("index", {name: "michelle!", questionOne: "What are you looking for?", questionTwo: "Do you want a designer or a developer?"});
    }

  };
}

module.exports = handlers;
