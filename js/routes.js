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
    path: '/settings',
    handler: handlers.loadSettings
  },
  {
    method: 'POST',
    path: '/settingsSubmit',
    handler: handlers.settingsSubmit
  },
  { //route for all css, images and js files
    method: 'GET',
    path: '/static/{path*}',
    handler:  {
      directory: {
        path: './'
      }
    }
  }
];
