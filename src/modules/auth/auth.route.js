const Router = require('koa-router');
const passport = require('koa-passport');
const router = new Router();
const controller = require('./auth.controller');
const { jwt, errorHandler } = require('../../helpers/jwt');

router.post('/login', controller.logIn);
router.post('/logout', controller.logOut);
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);
router.post('/twitter', passport.authenticate('twitter'));
router.post('/google', passport.authenticate('google'));
router.get('/facebook/redirect', controller.handleFacebookLogIn);
router.get('/twitter/redirect', controller.handleTwitterLogIn);
router.get('/google/redirect', controller.handleGoogleLogIn);

module.exports = router.routes();
