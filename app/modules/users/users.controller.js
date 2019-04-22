const User = require('./users.model');
const { generatePaginationQuery } = require('../../helpers/query-helpers');

async function createUser(ctx, next) {
  const { email, password, name } = ctx.request.body;

  if (email && password) {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        ctx.status = 400;
        return (ctx.body = {
          errors: [
            {
              message: 'Email already exixts',
            },
          ],
        });
      } else {
        let user = new User({
          email,
          password,
          name,
        });
        const newUser = await user.save();
        let result = { ...newUser._doc };
        delete result.password;

        ctx.status = 201;
        ctx.body = result;

        return ctx.login(newUser);
      }
    } catch (err) {
      ctx.status = 500;
      console.log(err);
      return (ctx.body = {
        errors: [
          {
            message: err.message,
          },
        ],
      });
    }
  } else {
    ctx.status = 400;
    let errors = [];
    if (!email) errors.push({ message: 'Email is required' });
    if (!password) errors.push({ message: 'Password is required' });
    ctx.body = {
      errors,
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

  const results = await User.find({})
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
