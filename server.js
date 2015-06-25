 var hapi = require('hapi'),
    path = require('path'),
    bell = require('bell'),
    // config = require('./tokens.json'),
    cookie = require('hapi-auth-cookie'),
    Bcrypt = require('bcrypt'),
    Hapi = require('hapi'),
    Basic = require('hapi-auth-basic'),
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

 var users = {
    admin: {
        username: 'admin',
        password: '$'+process.env.ADMIN_PASSWORD_PART1+'$'+process.env.ADMIN_PASSWORD_PART2+'$'+process.env.ADMIN_PASSWORD_PART3,   
        name: 'admin',
        id: '2133d32a'
    }
};

var validate = function (username, password, callback) {
    var user = users[username];
    if (!user) {
        return callback(null, false);
    }


    Bcrypt.compare(password, user.password, function (err, isValid) {
        console.log(isValid);
        callback(err, isValid, { id: user.id, name: user.name });
    });



};

server.views({
  engines: {
    html: require('handlebars')
  },
  path: path.join(__dirname, "views")
});

server.register(Basic, function (err) {
server.auth.strategy('simple', 'basic', { validateFunc: validate });
server.route(require('./js/routes.js'));
});

server.start(function () {
  console.log('Server running at: ' + server.info.uri);
});

module.exports = server;