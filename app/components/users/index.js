const Router = require('koa-router');
const router = new Router();
const controller = require('./users.controller');

router.get('/', controller.getAllUsers);
router.post('/', controller.createUser);
router.get('/:id', controller.getUserById);

module.exports = router.routes();
