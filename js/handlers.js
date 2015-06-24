var redis = require('./redisAdaptor')({connection: require('redis')});
var mandrill = require('./mandrill.js');

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
      redis.set("home", JSON.parse(request.payload), function(err, data) {
        if (err) {
          console.log(err);
        } else {
          mandrill.sendEmail(request);
          console.log("hello");
          reply(data);
          console.log("Settings changed");
        }
      });
    },

    loadHome: function (request, reply) {
      var divs = '';
      redis.get("home", function(err, data) {
        if (err) {
          console.log(err);
        } else {
          for(var x in data) {
            divs +=
              '<div class="textbox">' +
                '<p>' + data[x] + '</p>' +
                '<textarea></textarea>' +
              '</div>';
          }
          reply.view("index", {body: divs});
        }
      });
    },

    loadSettings: function (request, reply) {
      var divs = '';
      redis.get("home", function(err, data) {
        if (err) {
          console.log(err);
        } else {
          for(var x in data) {
            divs +=
              '<div>' +
                '<textarea>' + data[x] + '</textarea>' +
              '</div>';
          }
          reply.view("settings", {body: divs});
        }
      });
    }

  };
}

module.exports = handlers;
