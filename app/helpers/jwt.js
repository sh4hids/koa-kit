const jwt = require('koa-jwt');
const jsonwebtoken = require('jsonwebtoken');
const config = require('../config');

const jwtInstance = jwt({ secret: config.jwt.secret, key: 'user' });

function JWTErrorHandler(ctx, next) {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        errors: {
          auth_error: [err.message || 'Authentication error'],
        },
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

module.exports.verifyToken = (ctx, token) => {
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

module.exports.jwtSession = () => ({ session: config.jwt.session });
