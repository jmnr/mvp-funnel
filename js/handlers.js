var redis = require('./redisAdaptor')({connection: require('redis')}),
    mandrill = require('./mandrill.js'),
    gitHubApi = require("github");
    //pwPromt = require('./pwPromt.js');


var encodeBase64 = function (t){
    var u;
    var e =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    if (0 === t.length) return 'ENTER SOME TEXT!';
    var n, a = [];
    if (/([^\u0000-\u00ff])/.test(t) || void 0 === t) {
        return false;
    }
    for (var o = 0; o < t.length; o++) {
        var i = t.charCodeAt(o);
        u = o % 3;
        switch (u) {
            case 0:
                a.push(e.charAt(i >> 2));
                break;
            case 1:
                a.push(e.charAt((3 & n) << 4 | i >> 4));
                break;
            case 2:
                a.push(e.charAt((15 & n) << 2 | i >> 6)), a.push(e.charAt(
                    63 & i));
        }
        n = i
    }
    return 0 === u ? (a.push(e.charAt((3 & n) << 4)), a.push("==")) : 1 ===
        u && (a.push(e.charAt((15 & n) << 2)), a.push("=")), a.join("")
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
      var arr = [];
      var obj = JSON.parse(request.payload);

      for(var x in obj) {
        arr.push(x);
        arr.push(obj[x]);
      }

      var ghString = encodeBase64(arr.join("<br/>"));

      var github = new gitHubApi({
        // required
        version: "3.0.0",
        // optional
        debug: true,
        protocol: "https",
        host: "api.github.com", // should be api.github.com for GitHub
        // pathPrefix: "/api/v3", // for some GHEs; none for GitHub
        timeout: 5000,
        headers: {
          "user-agent": "mvp-funnel-App" // GitHub is happy with a unique user agent
        }
      });

      github.authenticate({
        type: "oauth",
        token: process.env.TOKEN
      });

      github.repos.createFile({
        // headers: Optional. Key/ value pair of request headers to pass along with the HTTP request.
        // Valid headers are: 'If-Modified-Since', 'If-None-Match', 'Cookie', 'User-Agent', 'Accept', 'X-GitHub-OTP'.
        // id: 37860032,
        user : "jmnr",
        repo : "mvp-funnel",
        content: ghString,
        message: "testing",
        path : new Date().getTime() + ".md",
        branch : "test",
      }, function(err, res) {
        // mandrill.sendEmail(request); //sends email
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
              '<button id="submit" class="button">SUBMIT</button>'
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

    // loadHome: function (request, reply) {
    //   var divs = '';
    //   redis.get("home", function(err, data) {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       // for(var x in data) {
    //         divs +=
    //           '<div id="div0" class="current" class="textbox">' +
    //             '<p>' + data.div0 + '</p>' +
    //             '<textarea></textarea>' +
    //           '</div>';
    //       // }
    //       reply.view("index", {body: divs});
    //     }
    //   });
    // },

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
