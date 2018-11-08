const Router = require('koa-router');
const passport = require('koa-passport');
const router = new Router();
const controller = require('./auth.controller');

router.post('/login', controller.logIn);

router.get('/logout', controller.logOut);

module.exports = router.routes();
