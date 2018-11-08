const passport = require('koa-passport');

async function logIn(ctx, next) {
  return passport.authenticate('local', async (err, user, info) => {
    if (user === false) {
      ctx.status = 401;
      ctx.body = info.message;
    } else {
      try {
        // const { accessToken, refreshToken } = await generateTokens({user}, "secret");
        ctx.login(user);
        ctx.body = {
          success: true,
          message: "You've successfully logged in.",
        };
      } catch (e) {
        ctx.throw(500, e);
      }
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

module.exports = { logIn, logOut };
