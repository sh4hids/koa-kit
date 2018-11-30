const User = require('./users.model');

async function createUser(ctx, next) {
  const { email, password } = ctx.request.body;
  if (email && password) {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        ctx.status = 409;
        return (ctx.body = {
          message: 'Email already exists',
          status: 409,
        });
      } else {
        let newUser = new User();
        newUser.email = email;
        newUser.password = await newUser.generateHash(password);
        const user = await newUser.save();
        ctx.status = 201;
        ctx.body = {
          status: 201,
          data: 'User created successfully.',
        };
        return ctx.login(user);
      }
    } catch (err) {
      ctx.status = 500;
      return (ctx.body = {
        message: err.message,
        status: 500,
      });
    }
  } else {
    ctx.status = 422;
    ctx.body = {
      message: 'User created successfully!',
      status: 422,
    };
  }
}

async function getUserById(ctx, next) {
  const userId = ctx.params.id;
  ctx.body = {
    success: true,
    data: {
      success: true,
      message: 'User created successfully!',
      data: {
        name: 'Shahidul Islam Majumder',
        username: 'sh4hids',
        email: 'hello@shahid.pro',
      },
    },
  };
}

async function getAllUsers(ctx, next) {
  ctx.ok({
    success: true,
    data: {
      total: 2,
      page: 1,
      perPage: 10,
      hasMore: false,
      users: [
        {
          name: 'Shahidul Islam Majumder',
          username: 'sh4hids',
          email: 'hello@shahid.pro',
        },
        {
          name: 'Saiful Islam Majumder',
          username: 'shafu',
          email: 'hello@shafu.pro',
        },
      ],
    },
  });
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
};
