const { jwt, verifyToken } = require('../helpers/jwt');
const TokenBlacklist = require('../modules/auth/token-blacklist.model');

const isAuthenticated = async (ctx, next) => {
  try {
    const token = ctx.request.header.authorization.split(' ')[1];
    const invalidToken = await TokenBlacklist.findOne({ token });
    if (invalidToken) {
      ctx.throw(401, { message: 'Authorization error' });
    }
    return jwt(ctx, next);
  } catch (err) {
    ctx.throw(401, { message: err.message || 'Authorization error' });
    return false;
  }
};

const isAdmin = async (ctx, next) => {
  try {
    const token = ctx.request.header.authorization.split(' ')[1];
    const invalidToken = await TokenBlacklist.findOne({ token });
    const userData = verifyToken(ctx, token);
    if (invalidToken || userData.role !== 'admin') {
      ctx.throw(401, { message: 'Authorization error' });
    }
    ctx.state.user = userData;
    return next();
  } catch (err) {
    ctx.throw(401, { message: err.message || 'Authorization error' });
    return false;
  }
};

module.exports = {
  isAuthenticated,
  isAdmin,
};
