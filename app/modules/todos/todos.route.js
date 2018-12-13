const Router = require('koa-router');
const router = new Router();
const controller = require('./todos.controller');
const { ensureAuthenticated } = require('../../middlewares/auth');

router.post('/', ensureAuthenticated, controller.createTodo);
router.get('/', ensureAuthenticated, controller.getAllTodos);
router.get('/:taskId', ensureAuthenticated, controller.getTodoById);
router.put('/:taskId', ensureAuthenticated, controller.updateTodo);
router.delete('/:taskId', ensureAuthenticated, controller.deleteTodo);
router.put('/toggle/:taskId', ensureAuthenticated, controller.toggleTodos);

module.exports = router.routes();
