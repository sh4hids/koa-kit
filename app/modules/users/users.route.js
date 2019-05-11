const Router = require('koa-router');
const router = new Router();
const controller = require('./users.controller');
const todoController = require('../todos/todos.controller');
const { isAuthenticated, isAdmin } = require('../../middlewares/auth');

router.post('/', controller.createUser);
router.get('/', controller.getAllUsers);
router.get('/:id', controller.getUserById);

module.exports = router.routes();
