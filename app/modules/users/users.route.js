const Router = require('koa-router');
const router = new Router();
const controller = require('./users.controller');
const { todoController } = require('../todos');
const { ensureAuthenticated, ensureAdmin } = require('../../middlewares/auth');

router.post('/', controller.createUser);
router.get('/', ensureAdmin, controller.getAllUsers);
router.get('/:id', ensureAuthenticated, controller.getUserById);
router.get('/:id/todos', ensureAuthenticated, todoController.getAllTodos);

module.exports = router.routes();
