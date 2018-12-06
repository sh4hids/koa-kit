const ensureAuthenticated = async function(ctx, next) {
  if (!ctx.isAuthenticated()) {
    ctx.throw(401, 'You must be logged in to access this content.');
  }
  return next();
};

const ensureAdmin = async function(ctx, next) {
  if (!ctx.isAuthenticated() || ctx.state.user.role !== 'admin') {
    ctx.throw(401, 'You are not authorized to access this content.');
  }
  return next();
};

module.exports = {
  ensureAuthenticated,
  ensureAdmin,
};
