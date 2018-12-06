const Router = require('koa-router');
const router = new Router();
const controller = require('./users.controller');
const todoController = require('../todos/todos.controller');
const { ensureAuthenticated, ensureAdmin } = require('../../middlewares/auth');

router.post('/', controller.createUser);
router.get('/', ensureAdmin, controller.getAllUsers);
router.get('/:userId', ensureAuthenticated, controller.getUserById);
router.get('/:userId/todos', ensureAuthenticated, todoController.getAllTodos);

module.exports = router.routes();
