var redis = require('./redisAdaptor')({connection: require('redis')});

function handlers() {
  return {

    sendData: function (request, reply) {
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
              '<div>' +
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