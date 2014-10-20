// Generated by CoffeeScript 1.8.0
module.exports = function(req, res, next) {
  var buf, isNoAuthRoute;
  isNoAuthRoute = req.url.indexOf("/routes") !== 0;
  isNoAuthRoute = isNoAuthRoute && req.url.indexOf("/login") !== 0;
  isNoAuthRoute = isNoAuthRoute && req.url.indexOf("/password") !== 0;
  isNoAuthRoute = isNoAuthRoute && req.url.indexOf("/register") !== 0;
  if (isNoAuthRoute) {
    return next();
  } else {
    req._body = true;
    buf = "";
    req.setEncoding("utf8");
    req.on("data", function(chunk) {
      return buf += chunk;
    });
    return req.on("end", function() {
      var err;
      if (buf.length > 0 && "{" !== buf[0] && "[" !== buf[0]) {
        return next(new Error("invalid json"));
      }
      try {
        if (buf.length > 0) {
          req.body = JSON.parse(buf);
        } else {
          req.body = "";
        }
        return next();
      } catch (_error) {
        err = _error;
        console.log(err);
        return next();
      }
    });
  }
};
