const Router = require('koa-router');
const router = new Router();
const controller = require('./users.controller');
const todoController = require('../todos/todos.controller');
const { isAuthenticated, isAdmin } = require('../../middlewares/auth');

router.post('/', controller.createUser);
router.get('/', isAuthenticated, isAdmin, controller.getAllUsers);
router.get('/:userId', isAuthenticated, controller.getUserById);
router.get('/:userId/todos', isAuthenticated, todoController.getAllTodos);

module.exports = router.routes();
