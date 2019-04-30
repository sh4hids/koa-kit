const config = require('../../config');
const User = require('./users.model');
const UserService = require('./user-service')(User);
const { isJSON } = require('../../helpers/object-helpers');
const { initToken } = require('../../helpers/jwt');

async function createUser(ctx, next) {
  try {
    const newUser = await UserService.createUser(ctx.request.body);
    let user = { ...newUser._doc };
    delete user.password;

    const token = initToken({
      _id: user._id,
      name: user.name,
      role: user.role,
      exp: Math.floor(Date.now() / 1000 + config.jwt.expiresIn),
    });

    ctx.ok({
      user,
      token,
    });
  } catch (e) {
    let errors = {};
    if (isJSON(e.message)) {
      errors = JSON.parse(e.message);
    } else {
      errors = { none_field_error: [e.message] };
    }
    ctx.status = 400;
    ctx.body = {
      errors: errors,
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
      errors: { server_error: [e.message] },
    };
  }
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
};
