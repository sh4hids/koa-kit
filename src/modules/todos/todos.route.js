const Router = require('koa-router');
const router = new Router();
const controller = require('./todos.controller');
const { isAuthenticated, isAdmin } = require('../../middlewares/auth');

router.post('/', isAuthenticated, controller.createTodo);
router.get('/', isAdmin, controller.getAllTodos);
router.get('/:taskId', isAuthenticated, controller.getTodoById);
router.put('/:taskId', isAuthenticated, controller.updateTodo);
router.delete('/:taskId', isAuthenticated, controller.deleteTodo);
router.put('/toggle/:taskId', isAuthenticated, controller.toggleTodos);

module.exports = router.routes();
