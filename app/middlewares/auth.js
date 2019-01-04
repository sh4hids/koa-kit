const { jwt, verifyToken } = require('../helpers/jwt');
const TokenBlacklist = require('../modules/auth/token-blacklist.model');

const isAuthenticated = async function(ctx, next) {
  try {
    const token = ctx.request.header.authorization.split(' ')[1];
    const invalidToken = await TokenBlacklist.findOne({ token: token });
    if (invalidToken) {
      ctx.throw(401, { message: 'Invalid token' });
    }
    return jwt(ctx, next);
  } catch (err) {
    ctx.throw(401, { message: err.message || 'Authorization error' });
  }
};

const isAdmin = async function(ctx, next) {
  const token = ctx.request.header.authorization.split(' ')[1];
  if (!token || verifyToken(token).role !== 'admin') {
    ctx.throw(401, {
      message:
        verifyToken(token).message ||
        'You are not authorized to access this content.',
    });
  }
  return next();
};

module.exports = {
  isAuthenticated,
  isAdmin,
};
