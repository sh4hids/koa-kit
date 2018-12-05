const ensureAuthenticated = async function(ctx, next) {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      success: false,
      message: 'You must be logged in to access this content.',
    };
    ctx.throw(401, 'You must be logged in to access this content.');
  }
  return next();
};

const ensureAdmin = async function(ctx, next) {
  console.log(ctx.state.user.email);
  console.log(ctx.isAuthenticated(), ctx.state.user.role);
  if (!ctx.isAuthenticated() || ctx.state.user.role !== 'admin') {
    ctx.throw(401, 'You are not authorized to access this content.');
  }
  return next();
};

module.exports = {
  ensureAuthenticated,
  ensureAdmin,
};
