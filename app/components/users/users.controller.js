const User = require('./users.model');

async function createUser(ctx, next) {
  const newUser = ctx.request.body;
  ctx.body = {
    success: true,
    message: 'User created successfully!',
    data: newUser,
  };
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
  ctx.body = {
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
  };
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
};
