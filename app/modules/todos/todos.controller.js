const Todo = require('./todos.model');
const users = require('../users');
console.log('Hello');
console.log(users);

async function createTodos(ctx, next) {
  try {
    const { id } = ctx.state.user;
    console.log(id);

    const user = await User.findOne({ _id: id }).select('name');
    ctx.body = {
      user: user,
    };
  } catch (err) {
    ctx.status = 500;
    return (ctx.body = {
      message: err.message,
      status: 500,
    });
  }
}

async function getTodosById(ctx, next) {
  const { id } = ctx.params;
  ctx.body = {
    id: id,
  };
}

async function getAllTodos(ctx, next) {
  const { userId } = ctx.params;
  ctx.body = {
    userId: userId,
  };
}

module.exports = {
  createTodos,
  getTodosById,
  getAllTodos,
};
