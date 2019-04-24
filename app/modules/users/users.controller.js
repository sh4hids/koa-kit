const User = require('./users.model');
const UserService = require('./user-service')(User);
const { isJSON } = require('../../helpers/object-helpers');

async function createUser(ctx, next) {
  try {
    const newUser = await UserService.createUser(ctx.request.body);
    let user = { ...newUser._doc };
    delete user.password;

    ctx.status = 201;
    ctx.body = user;
  } catch (e) {
    let errors = {};
    if (isJSON(e.message)) {
      errors = JSON.parse(e.message);
    } else {
      errors = { none_field_error: [e.message] };
    }
    ctx.status = 400;
    ctx.body = {
      error: errors,
    };
  }
}

async function getUserById(ctx, next) {
  const { id } = ctx.params;
  const user = await User.findById(id).select('name email createdAt');
  ctx.body = user;
}

async function getAllUsers(ctx, next) {
  const { limit, page } = ctx.request.query;
  try {
    const data = await UserService.getUserList({ limit, page });
    ctx.ok(data);
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      error: { server_error: [e.message] },
    };
  }
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
};
