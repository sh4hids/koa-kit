require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-logger');
const Cors = require('@koa/cors');
const BodyParser = require('koa-bodyparser');
const Helmet = require('koa-helmet');
const respond = require('koa-respond');
const session = require('koa-session');
const passport = require('koa-passport');
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

if (config.appEnv === 'development') {
  app.use(Logger());
}

app.use(Cors());
app.use(
  BodyParser({
    enableTypes: ['json'],
    jsonLimit: '5mb',
    strict: true,
    onerror(err, ctx) {
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
require('./app/routes/root.routes')(router);
require('./app/routes/v1.routes')(router);

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
