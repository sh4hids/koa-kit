const Router = require('koa-router');
const router = new Router();
const controller = require('./todos.controller');
const { ensureAuthenticated } = require('../../middlewares/auth');

router.post('/', ensureAuthenticated, controller.createTodos);
router.get('/', ensureAuthenticated, controller.getAllTodos);
router.get('/:id', ensureAuthenticated, controller.getTodosById);

module.exports = router.routes();
