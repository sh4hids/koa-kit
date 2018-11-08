const ensureAuthenticated = async function(ctx, next) {
  if (!ctx.isAuthenticated()) {
    return ctx.redirect('/auth/login');
  }
  return next();
};

module.exports = ensureAuthenticated;
