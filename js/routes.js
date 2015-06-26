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
    handler: function(request, reply) {
      reply.view("index");
    }
  },
  {
    method: 'GET',
    path: '/divLoad',
    handler: handlers.divLoad
  },
  {
    method: 'GET',
    path: '/settings',
    config:{
      auth: 'simple',
        handler: handlers.loadSettings
      }
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
  }
];