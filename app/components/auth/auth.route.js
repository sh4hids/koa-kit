const Router = require('koa-router');
const passport = require('koa-passport');
const router = new Router();
const controller = require('./auth.controller');

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/api/v1/users',
    failureRedirect: '/',
  })
);

router.get('/logout', async ctx => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.redirect('/api/v1/');
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
});

module.exports = router.routes();
