var redis = require('./redisAdaptor')({connection: require('redis')}),
    bcrypt = require('bcrypt');

module.exports = {
  validate: function (username, password, callback) {
    redis.get('pw', function (err, data) {
      if (err) {
        console.log(err);
      } else {
        var users = {
          admin: {
            username: 'admin',
            password: data.hash,
            name: 'admin',
            id: '2133d32a'
          }
        };

        if (!users[username]) {
          return callback(null, false);
        }

        bcrypt.compare(password, users.admin.password, function (err, isValid) {
          callback(err, isValid, { id: users.admin.id, name: users.admin.name });
        });
      }
    });
  }
};