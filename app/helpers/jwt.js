const config = require('../config');
const jwt = require('koa-jwt');
const jsonwebtoken = require('jsonwebtoken');
const jwtInstance = jwt({ secret: config.jwt.secret });

function JWTErrorHandler(ctx, next) {
  return next().catch(err => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: err.message || 'Authentication error',
      };
    } else {
      throw err;
    }
  });
}

module.exports.jwt = jwtInstance;
module.exports.jwtErrorHandler = () => JWTErrorHandler;
module.exports.initToken = payload => {
  return jsonwebtoken.sign(payload, config.jwt.secret);
};

module.exports.verifyToken = token => {
  try {
    return jsonwebtoken.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        ctx.throw(401);
      }
      return decoded;
    });
  } catch (err) {
    return { isValid: false, message: 'Invalid token' };
  }
};

module.exports.jwtSession = () => ({ session: false });
