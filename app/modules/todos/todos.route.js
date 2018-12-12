const Router = require('koa-router');
const router = new Router();
const controller = require('./todos.controller');
const { ensureAuthenticated } = require('../../middlewares/auth');

router.post('/', ensureAuthenticated, controller.createTodos);
router.get('/', ensureAuthenticated, controller.getAllTodos);
router.get('/:taskId', ensureAuthenticated, controller.getTodosById);
router.post('/:taskId', ensureAuthenticated, controller.updateTodos);
router.get('/toggle/:taskId', ensureAuthenticated, controller.toggleTodos);

module.exports = router.routes();
