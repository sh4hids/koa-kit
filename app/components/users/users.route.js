const Router = require('koa-router');
const router = new Router();
const controller = require('./users.controller');
const ensureAuthenticated = require('../../middlewares/auth');

router.get('/', ensureAuthenticated, controller.getAllUsers);
router.post('/', controller.createUser);
router.get('/:id', controller.getUserById);

module.exports = router.routes();
