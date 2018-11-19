const passport = require('koa-passport');
const { initToken } = require('../../helpers/jwt');

async function showLogInPage(ctx, next) {
  ctx.body = {
    message: "You're in log in page",
  };
}
// http://polyglot.ninja/rest-api-koajs-mongodb-part-3/
async function logIn(ctx, next) {
  return passport.authenticate(
    'local',
    { session: false },
    async (err, user, info) => {
      if (user === false) {
        ctx.status = 401;
        ctx.body = info.message;
      } else {
        try {
          const token = initToken({ user });
          ctx.body = {
            token,
          };
        } catch (e) {
          ctx.throw(500, e);
        }
      }
    }
  )(ctx, next);
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
