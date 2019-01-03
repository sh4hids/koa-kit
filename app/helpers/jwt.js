const env = process.env.NODE_ENV || 'development';
const CONFIG = require('../config')[env];
const jwt = require('koa-jwt');
const jsonwebtoken = require('jsonwebtoken');
const jwtInstance = jwt({ secret: CONFIG.jwt.secret });

function JWTErrorHandler(ctx, next) {
  return next().catch(err => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: err.message,
        data: {},
      };
    } else {
      throw err;
    }
  });
}

module.exports.jwt = () => jwtInstance;
module.exports.errorHandler = () => JWTErrorHandler;
module.exports.initToken = payload => {
  return jsonwebtoken.sign(payload, CONFIG.jwt.secret, {
    expiresIn: CONFIG.jwt.expiresIn,
  });
};
module.exports.jwtSession = () => ({ session: false });
