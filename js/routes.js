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
    path: '/sendData',
    handler: handlers.sendData
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
