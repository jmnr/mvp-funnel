var redis = require('./redisAdaptor')({connection: require('redis')});
var mandrill = require('./mandrill.js');

function handlers() {
  return {

    settingsSubmit: function (request, reply) {
      var settings = request.payload;
      if(settings.indexOf("<") > -1 || settings.indexOf(">") > -1) {
        settings = settings.replace(/</g, "&lt").replace(/>/g, "&gt");
      }
      redis.set("home", JSON.parse(settings), function(err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log("Settings submitted!");
          reply(true);
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
