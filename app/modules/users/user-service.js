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

module.exports = User => {
  return { createUser: createUser(User) };
};
