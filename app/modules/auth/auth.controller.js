const passport = require('koa-passport');

async function showLogInPage(ctx, next) {
  ctx.body = {
    message: "You're in log in page",
  };
}

async function logIn(ctx, next) {
  return passport.authenticate('local', async (err, user, info) => {
    if (user === false) {
      ctx.status = 401;
      ctx.body = {
        status: 401,
        success: false,
      };
    } else {
      ctx.body = {
        success: true,
      };
      return ctx.login(user);
    }
  })(ctx, next);
}

async function logOut(ctx) {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.redirect('/api/v1/');
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
}

module.exports = { showLogInPage, logIn, logOut };
