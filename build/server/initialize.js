// Generated by CoffeeScript 1.9.1
var Device, configurePassport, initializeProxy, localization, router;

configurePassport = require('./lib/passport_configurator');

router = require('./lib/router');

initializeProxy = require('./lib/proxy').initializeProxy;

localization = require('./lib/localization_manager');

Device = require('./models/device');

module.exports = function(app, server, callback) {
  if (callback == null) {
    callback = function() {};
  }
  configurePassport();
  initializeProxy(app, server);
  return localization.initialize(function() {
    return Device.update(function() {
      return router.reset(function() {
        return router.displayRoutes(function() {
          return callback(app, server);
        });
      });
    });
  });
};
