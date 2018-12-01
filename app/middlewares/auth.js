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

module.exports = ensureAuthenticated;
