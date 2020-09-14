const Router = require('koa-router');
const controller = require('./controller');

const router = new Router();

router.get('/', controller.showHomePage);

module.exports = router.routes();
