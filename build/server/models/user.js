// Generated by CoffeeScript 1.9.3
var Client, User, americano, client, helpers, ref, timezones,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

americano = require('americano-cozy');

Client = require('request-json').JsonClient;

helpers = require('../lib/helpers');

timezones = require('../lib/timezones');

client = new Client("http://localhost:9101/");

if ((ref = process.env.NODE_ENV) === 'production' || ref === 'test') {
  client.setBasicAuth(process.env.NAME, process.env.TOKEN);
}

module.exports = User = americano.getModel('User', {
  email: String,
  password: String,
  salt: String,
  public_name: String,
  timezone: String,
  owner: Boolean,
  activated: Boolean
});

User.createNew = function(data, callback) {
  data.docType = "User";
  return client.post("user/", data, function(err, res, body) {
    if (err != null) {
      return callback(err);
    } else if (res.statusCode !== 201) {
      err = res.statusCode + " -- " + body;
      return callback(err);
    } else {
      return callback();
    }
  });
};

User.prototype.merge = function(data, callback) {
  return client.put("user/merge/" + this.id + "/", data, (function(_this) {
    return function(err, res, body) {
      if (err != null) {
        return callback(err);
      } else if (res.statusCode === 404) {
        return callback(new Error("Model does not exist"));
      } else if (res.statusCode !== 200) {
        err = res.statusCode + " -- " + body;
        return callback(err);
      } else {
        return callback();
      }
    };
  })(this));
};

User.first = function(callback) {
  return User.request('all', function(err, users) {
    if (err) {
      return callback(err);
    } else if (!users || users.length === 0) {
      return callback(null, null);
    } else {
      return callback(null, users[0]);
    }
  });
};

User.validate = function(data) {
  var errors, ref1;
  errors = [];
  errors = errors.concat(User.validatePassword(data.password));
  if (!helpers.checkEmail(data.email)) {
    errors.push('Invalid email format');
  }
  if (!(ref1 = data.timezone, indexOf.call(timezones, ref1) >= 0)) {
    errors.push('Invalid timezone');
  }
  return errors;
};

User.validatePassword = function(password) {
  var errors;
  errors = [];
  if ((password == null) || password.length < 5) {
    errors.push('Password is too short');
  }
  return errors;
};
