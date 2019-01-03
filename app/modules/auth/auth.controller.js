const passport = require('koa-passport');
const jwt = require('../../helpers/jwt');

async function logIn(ctx, next) {
  return passport.authenticate('local', async (err, user, info) => {
    if (user === false) {
      ctx.status = 401;
      ctx.body = {
        status: 401,
        success: false,
        message: 'Email or password not correct',
      };
    } else {
      const { _id, name, email, role } = user;
      ctx.body = {
        success: true,
        message: "You're successfully logged in.",
        data: {
          user: { _id, name, email, role },
          token: jwt.initToken({ _id }),
        },
      };
      return ctx.login(user);
    }
  })(ctx, next);
}

async function logOut(ctx) {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.body = {
      success: true,
      message: "You've just logged out.",
    };
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
}

async function handleFacebookLogIn(ctx, next) {
  return passport.authenticate('facebook', async (err, user, info) => {
    if (user === false) {
      ctx.status = 401;
      ctx.body = {
        status: 401,
        success: false,
      };
    } else {
      ctx.login(user);
      ctx.body = {
        success: true,
        message: "You're successfully logged in.",
      };
      return ctx.login(user);
    }
  })(ctx, next);
}

async function handleTwitterLogIn(ctx, next) {
  return passport.authenticate('twitter', async (err, user, info) => {
    if (user === false) {
      ctx.status = 401;
      ctx.body = {
        status: 401,
        success: false,
      };
    } else {
      ctx.body = {
        success: true,
        message: "You're successfully logged in.",
      };
      return ctx.login(user);
    }
  })(ctx, next);
}

async function handleGoogleLogIn(ctx, next) {
  return passport.authenticate('google', async (err, user, info) => {
    if (user === false) {
      ctx.status = 401;
      ctx.body = {
        status: 401,
        success: false,
      };
    } else {
      ctx.body = {
        success: true,
        message: "You're successfully logged in.",
      };
      return ctx.login(user);
    }
  })(ctx, next);
}

module.exports = {
  logIn,
  logOut,
  handleGoogleLogIn,
  handleFacebookLogIn,
  handleTwitterLogIn,
};
