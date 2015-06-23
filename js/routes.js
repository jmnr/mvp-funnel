var handlers = require('./handlers.js')();

module.exports = [
  {
    method: 'GET',
    path: '/',
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
  {
    method: 'POST',
    path: '/submit',
    handler: handlers.sendData
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
