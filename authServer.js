var Hapi = require('hapi'),
		fs = require('fs'),
		Bell = require('bell'),
		Config = require('./tokens.json'),
		Cookie = require('hapi-auth-cookie'),
		server = new Hapi.Server();

server.connection({ port: 5000 });

	server.register([Bell, Cookie], function (err) {
	if (err) throw err;

    server.auth.strategy('session', 'cookie', {
        cookie: 'sid',
        password: Config.session.cookieOptions.password,
        redirectTo: 'false',
        isSecure:false,
    });

		server.auth.strategy('github', 'bell', {
	      provider: 'github',
	      password: Config.auth.github.password,
				clientId: Config.auth.github.clientId,
				clientSecret: Config.auth.github.clientSecret,
	      isSecure: false
	  });
});

server.route(require('./authroutes'));

server.start(function () {
    console.log('Server running at: ' + server.info.uri);
});
