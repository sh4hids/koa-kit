const User = require('./users.model');
const UserService = require('./user-service')(User);
const { generatePaginationQuery } = require('../../helpers/query-helpers');

async function createUser(ctx, next) {
  try {
    const newUser = await UserService.createUser(ctx.request.body);
    let user = { ...newUser._doc };
    delete user.password;

    ctx.status = 201;
    ctx.body = user;
  } catch (e) {
    let errors = [];
    if (e.message) {
      errors = JSON.parse(e.message);
    } else {
      errors = [{ message: e }];
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
  const count = await User.countDocuments();
  const pagination = generatePaginationQuery({
    limit,
    page,
    count,
    path: '/users',
  });
  const query = {};

  const results = await User.find(query)
    .skip(pagination.offset)
    .limit(pagination.limit)
    .select('name email createdAt');
  ctx.ok({
    count,
    results,
    previous: pagination.previous,
    next: pagination.next,
  });
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
};
