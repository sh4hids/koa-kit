const Todo = require('./todos.model');
const User = require('../users/users.model');

async function createTodos(ctx, next) {
  try {
    const { id } = ctx.state.user;
    const { task, description } = ctx.request.body;

    const user = await User.findOne({ _id: id });

    if (!user) {
      ctx.body = {
        success: false,
        message: 'User not found',
      };
    } else {
      const newTask = new Todo();
      newTask.title = task;
      newTask.description = description;
      newTask.createdBy = id;
      const createdTask = await newTask.save();

      ctx.status = 201;
      ctx.body = {
        success: true,
        message: 'New task added successfully!',
        data: createdTask,
      };
    }
  } catch (err) {
    ctx.status = 500;
    return (ctx.body = {
      message: err.message,
      status: 500,
    });
  }
}

async function getTodosById(ctx, next) {
  try {
    const { taskId } = ctx.params;
    const { id } = ctx.state.user;

    const task = await Todo.findOne({ _id: taskId, createdBy: id });

    if (!task) {
      ctx.status = 404;
      ctx.body = {
        success: false,
        message: 'Task not found',
      };
    } else {
      ctx.body = {
        success: true,
        data: task,
      };
    }
  } catch (err) {
    ctx.status = 500;
    return (ctx.body = {
      message: err.message,
      status: 500,
    });
  }
}

async function getAllTodos(ctx, next) {
  try {
    const { userId } = ctx.params;
    const todos = await Todo.find({ createdBy: userId });
    ctx.body = {
      success: true,
      data: todos,
    };
  } catch (err) {
    ctx.status = 500;
    return (ctx.body = {
      message: err.message,
      status: 500,
    });
  }
}

module.exports = {
  createTodos,
  getTodosById,
  getAllTodos,
};
