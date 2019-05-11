const { generatePaginationQuery } = require('../../helpers/query-helpers');

const createUser = User => async ({ name, email, password }) => {
  if (name && email && password) {
    const user = await User.findOne({ email: email });
    if (user) {
      const errors = JSON.stringify({ email: ['Email already exixts'] });
      throw new Error(errors);
    }
    const newUser = new User({ name, email, password });
    return newUser.save();
  } else {
    let errors = {};
    if (!name) errors.name = ['Name is required'];
    if (!email) errors.email = ['Email is required'];
    if (!password) errors.password = ['Password is required'];
    errors = JSON.stringify(errors);
    throw new Error(errors);
  }
};

const getSingleUser = User => async (
  query = {},
  fileds = 'username name email'
) => {
  try {
    console.log(query);
    const user = await User.findOne(query).select(fileds);
    return new Promise((resolve, reject) => {
      resolve(user);
    });
  } catch (e) {
    return new Promise((resolve, reject) => {
      reject(e);
    });
  }
};

const getUserList = User => async ({ limit, page, query = {} }) => {
  const count = await User.countDocuments();
  const pagination = generatePaginationQuery({
    limit,
    page,
    count,
    path: '/users',
  });

  try {
    const results = await User.find(query)
      .skip(pagination.offset)
      .limit(pagination.limit)
      .select('name email createdAt');

    return new Promise((resolve, reject) => {
      resolve({
        count,
        results,
        previous: pagination.previous,
        next: pagination.next,
      });
    });
  } catch (e) {
    return new Promise((resolve, reject) => {
      reject(e);
    });
  }
};

module.exports = User => {
  return {
    createUser: createUser(User),
    getSingleUser: getSingleUser(User),
    getUserList: getUserList(User),
  };
};
