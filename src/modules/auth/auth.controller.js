const config = require('../../config');
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
          errors: {
            auth_error: ['Email or password not correct'],
          },
        };
      } else {
        const { _id, name, email, role, lastLogout } = user;
        const token = initToken({
          _id,
          name,
          role,
          exp: Math.floor(Date.now() / 1000 + config.jwt.expiresIn),
        });
        ctx.ok({
          user: { _id, name, role },
          token,
        });
      }
    }
  )(ctx, next);
}

async function logOut(ctx) {
  try {
    const token = ctx.request.header.authorization.split(' ')[1];
    const invalidToken = await TokenBlacklist.findOne({ token: token });

    if (!invalidToken) {
      const userData = verifyToken(token);
      const userId = userData._id;
      const tokenData = {
        token,
        createdBy: userId,
      };
      const invalidToken = new TokenBlacklist(tokenData);
      await invalidToken.save();
    }

    ctx.ok({
      message: 'Successfully logged out',
    });
  } catch (err) {
    ctx.throw(401, { message: 'Invalid token' });
  }
}

async function handleFacebookLogIn(ctx, next) {
  return passport.authenticate('facebook', async (err, user, info) => {
    if (user === false) {
      ctx.status = 401;
      ctx.body = {
        errors: {
          auth_error: ['Authentication failed'],
        },
      };
    } else {
      ctx.login(user);
      ctx.ok({
        message: 'Successfully logged out',
      });
      return ctx.login(user);
    }
  })(ctx, next);
}

async function handleTwitterLogIn(ctx, next) {
  return passport.authenticate('twitter', async (err, user, info) => {
    if (user === false) {
      ctx.status = 401;
      ctx.body = {
        errors: {
          auth_error: ['Authentication failed'],
        },
      };
    } else {
      ctx.ok({
        message: 'Successfully logged out',
      });
      return ctx.login(user);
    }
  })(ctx, next);
}

async function handleGoogleLogIn(ctx, next) {
  return passport.authenticate('google', async (err, user, info) => {
    if (user === false) {
      ctx.status = 401;
      ctx.body = {
        errors: {
          auth_error: ['Authentication failed'],
        },
      };
    } else {
      ctx.ok({
        message: 'Successfully logged out',
      });
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
