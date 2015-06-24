var hapi = require('hapi'),
    path = require('path'),
    bell = require('bell'),
    // config = require('./tokens.json'),
    cookie = require('hapi-auth-cookie'),
    gitHubApi = require("github"),
    server = new hapi.Server();

server.connection({ port: process.env.PORT || 8000 });

// server.register([bell, cookie], function (err) {
//   if (err) {
//     throw err;
//   }

//   server.auth.strategy('session', 'cookie', {
//     cookie: 'sid',
//     password: 'password',
//     redirectTo: 'false',
//     isSecure: false
//   });

//   server.auth.strategy('github', 'bell', {
//     provider: 'github',
//     password: process.env.GH_PW,
//     clientId: process.env.GH_ID,
//     clientSecret: process.env.GH_SECRET,
//     isSecure: false
//   });

// });

server.views({
  engines: {
    html: require('handlebars')
  },
  path: path.join(__dirname, "views")
});

server.route(require('./js/routes.js'));

server.start(function () {
  console.log('Server running at: ' + server.info.uri);
});

module.exports = server;