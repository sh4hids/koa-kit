const Router = require('koa-router');
const router = new Router();
const v1Controller = require('./controller');

router.get('/', v1Controller.showHomePage);

module.exports = router.routes();
