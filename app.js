const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-logger');
const Cors = require('@koa/cors');
const BodyParser = require('koa-bodyparser');
const Helmet = require('koa-helmet');
const respond = require('koa-respond');
const session = require('koa-session');
const passport = require('koa-passport');
const env = process.env.NODE_ENV || 'development';
const config = require('./app/config');
const { jwtErrorHandler } = require('./app/helpers/jwt');
const { deleteExpiredToken } = require('./app/helpers/cron-jobs');

deleteExpiredToken.start();

const app = new Koa();
const router = new Router();

app.keys = [config.session.key];
app.use(
  session(
    {
      key: config.session.key,
      maxAge: config.session.maxAge,
    },
    app
  )
);

app.use(Helmet());

if (env === 'development') {
  app.use(Logger());
}

app.use(Cors());
app.use(
  BodyParser({
    enableTypes: ['json'],
    jsonLimit: '5mb',
    strict: true,
    onerror: function(err, ctx) {
      ctx.throw('body parse error', 422);
    },
  })
);

require('./app/helpers/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(respond());
app.use(jwtErrorHandler());

// API routes
require('./app/routes/root.route')(router);
require('./app/routes/api-v1.route')(router);
app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
