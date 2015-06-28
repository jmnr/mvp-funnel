var handlers = require('./handlers.js')();

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      reply.redirect("home");
    }
  },
  {
    method: 'GET',
    path: '/home',
    handler: handlers.loadHome
  },
  {
    method: 'GET',
    path: '/next',
    handler: handlers.loadNext
  },
  {
    method: 'GET',
    path: '/settings',
    handler: handlers.loadSettings
  },
  {
    method: 'POST',
    path: '/settingsSubmit',
    handler: handlers.settingsSubmit
  },
  {
    method: 'POST',
    path: '/mvpSubmit',
    handler: handlers.mvpSubmit
  },
  { //route for all css, images and js files
    method: 'GET',
    path: '/static/{path*}',
    handler:  {
      directory: {
        path: './'
      }
    }
  },
  //MERGE
  // {
  //   method :'GET',
  //   path : '/login',
  //   config: {
  //     auth:'github',
  //     handler : function (request, reply) {
  //       var creds = request.auth.credentials;
  //       console.log(creds);

  //       var ghProfile = {
  //         id: creds.profile.id,
  //         fullName: creds.profile.displayName,
  //         username: creds.profile.username,
  //         email: creds.profile.email
  //       };

  //       console.log(creds.token);

  //       //console.log(ghProfile);
  //       var authToken = creds.token;
  //       request.auth.session.clear();
  //       request.auth.session.set(creds);
  //       console.log("viewing");
  //       reply.file('views/feed.html');
  //     }
  //   }
  // },
  {
    method : 'GET',
    path : '/feed',
    handler: function (request, reply) {
      reply.file('views/feed.html');
    }
  },
  // {
  //   method :'GET',
  //   path : '/logout',
  //   config: {
  //     auth:{
  //       strategy: 'session'
  //     },
  //     handler: function (request, reply) {
  //       var creds = request.auth.credentials;
  //       request.auth.session.clear();
  //       //request.auth.session.set(request.auth.credentials.profile);
  //       return reply.redirect('/');
  //     }
  //   }
  // }
];
