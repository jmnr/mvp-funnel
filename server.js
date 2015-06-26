var hapi = require('hapi'),
    path = require('path'),
    basic = require('hapi-auth-basic'),
    auth = require('./js/auth'),
    server = new hapi.Server();

server.connection({ port: process.env.PORT || 8000 });

server.views({
  engines: {
    html: require('handlebars')
  },
  path: path.join(__dirname, "views")
});

server.register(basic, function (err) {
  server.auth.strategy('simple', 'basic', { validateFunc: auth.validate });
});

server.route(require('./js/routes.js'));

server.start(function () {
  console.log('Server running at: ' + server.info.uri);
});

module.exports = server;