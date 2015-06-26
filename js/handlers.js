var redis = require('./redisAdaptor')({connection: require('redis')}),
    mandrill = require('./mandrill.js'),
    gitHubApi = require("github");

var encodeBase64 = function(str) {
  var result = [],
      curr, //current working byte
      prev, //previous byte
      charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
      bytePosition;

  for(var i = 0; i < str.length; i++) {
    curr = str.charCodeAt(i);
    bytePosition = i % 3; //base64 is calculated in groups of 3 bytes

    switch(bytePosition){
      case 0: //first byte
        result.push(charset.charAt(curr >> 2));
        break;

      case 1: //second byte
        result.push(charset.charAt((prev & 3) << 4 | (curr >> 4)));
        break;

      case 2: //third byte
        result.push(charset.charAt((prev & 0x0f) << 2 | (curr >> 6)));
        result.push(charset.charAt(curr & 0x3f));
        break;
    }

    prev = curr;
  }
  //padding
  if(bytePosition === 0) {
    result.push(charset.charAt((prev & 3) << 4));
    result.push("==");
  }
  else if(bytePosition === 1) {
    result.push(charset.charAt((prev & 0x0f) << 2));
    result.push("=");
  }

  return result.join('');
};

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

    mvpSubmit: function (request, reply) {
      var arr = [],
          obj = JSON.parse(request.payload),
          content;

      for(var x in obj) {
        arr.push(x);
        arr.push(obj[x]);
      }

      content = arr.join("<br/>");

      var github = new gitHubApi({
        version: "3.0.0",
        debug: true,
        protocol: "https",
        host: "api.github.com",
        timeout: 5000,
        headers: {
          "user-agent": "mvp-funnel-App"
        }
      });

      github.authenticate({
        type: "oauth",
        token: process.env.TOKEN
      });

      github.repos.createFile({
        user : "jmnr",
        repo : "mvp-funnel",
        content: encodeBase64(content),
        message: "testing",
        path : new Date().getTime() + ".md",
        branch : "test",
      }, function(err, res) {
        mandrill.sendEmail(content); //sends email to admin upon submission
      });

      reply(true);
    },

    divLoad: function (request, reply) {
      var move = request.query.key || 0;

      redis.get("home", function(err, data) {
        if (err) {
          console.log(err);
        } else {
          if(!data["div" + move]) {
            reply(
              '<div id="div' + move + '" class="current" class="end">' +
                '<p>Thanks for your application, we\'ll be in touch soon!</p>' +
              '</div>' +
              '<button id="previous" class="button">PREVIOUS</button>' +
              '<button id="submit" class="button">SUBMIT & BOOK CONSULTATION TIME</button>'
            );
          } else {
            var out =
              '<div id="div' + move + '" class="current" class="textbox">' +
                '<p id="question">' + data["div" + move] + '</p>' +
                '<textarea id="answer"></textarea>' +
              '</div>';

            if(move === "0") {
              reply(out + '<button id="next" class="button">NEXT</button>');
            } else {
              reply(out + '<button id="previous" class="button">PREVIOUS</button>' +
              '<button id="next" class="button">NEXT</button>');
            }
          }
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
