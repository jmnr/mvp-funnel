var hapi = require('hapi'),
    path = require('path'),

    bell = require('bell'),
    // config = require('./tokens.json'),
    cookie = require('hapi-auth-cookie'),
    Bcrypt = require('bcrypt'),
    Hapi = require('hapi'),
    Basic = require('hapi-auth-basic'),
    gitHubApi = require("github"),
    redis = require('./js/redisAdaptor')({connection: require('redis')}),
    server = new hapi.Server();

server.connection({ port: process.env.PORT || 8000 });


var validate = function (username, password, callback) {
 
 var hashedPassword;
 
 redis.get('pw', function (err, data) {
    if (err) {
      console.log('error: '+err);
    } else {
    hashedPassword = data.hash;

     var users = {
        admin: {
            username: 'admin',
            password: hashedPassword,
            name: 'admin',
            id: '2133d32a'
        }
    };

    var user = users[username];
    if (!user) {
        return callback(null, false);
    }


    Bcrypt.compare(password, user.password, function (err, isValid) {
        callback(err, isValid, { id: user.id, name: user.name });
    });

}
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