const env = process.env.NODE_ENV || 'development';
const CONFIG = require('../../config')[env];
const passport = require('koa-passport');
const TokenBlacklist = require('./token-blacklist.model');
const { User } = require('../users');
const { initToken, jwtSession, verifyToken } = require('../../helpers/jwt');

async function logIn(ctx, next) {
  return passport.authenticate(
    'local',
    jwtSession(),
    async (err, user, info) => {
      if (user === false) {
        ctx.status = 401;
        ctx.body = {
          status: 401,
          success: false,
          message: 'Email or password not correct',
        };
      } else {
        const { _id, name, email, role, lastLogout } = user;
        const token = initToken({
          _id,
          name,
          role,
          exp: Math.floor(Date.now() / 1000 + CONFIG.jwt.expiresIn),
        });
        ctx.body = {
          success: true,
          message: "You're successfully logged in.",
          data: {
            user: { _id, name, role },
            token,
          },
        };
      }
    }
  )(ctx, next);
}

async function logOut(ctx) {
  try {
    const token = ctx.request.header.authorization.split(' ')[1];
    const userData = verifyToken(token);
    const userId = userData._id;
    const tokenData = {
      token,
      createdBy: userId,
    };
    const invalidToken = new TokenBlacklist(tokenData);
    await invalidToken.save();

    ctx.body = {
      success: true,
      message: "You've just logged out.",
    };
  } catch (err) {
    ctx.body = { success: false };
    ctx.throw(401, { message: 'You are not logged in' });
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

async function deleteExpiredToken() {
  try {
    console.log(`✓ Deleting expired tokens at ${new Date().toISOString()}`);
    const allTokens = await TokenBlacklist.find({});
    if (allTokens.length) {
      allTokens.map(async token => {
        const verified = verifyToken(token.token);
        if (!verified._id && !verified.isValid) {
          await TokenBlacklist.findOneAndDelete({
            _id: token._id,
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  logIn,
  logOut,
  handleGoogleLogIn,
  handleFacebookLogIn,
  handleTwitterLogIn,
  deleteExpiredToken,
};
