const mongoose = require('mongoose');
const db = 'mongodb://127.0.0.1/test_db';

mongoose.connect(db);

const User = require('../user.model');

describe('User model test', () => {
  beforeAll(async () => {
    await User.remove({});
  });

  afterEach(async () => {
    await User.remove({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('has User model', () => {
    expect(User).toBeDefined();
  });

  describe('create', () => {
    it('create a new user', async () => {
      const user = new User({
        name: 'John Doe',
        email: 'john@doe.com',
        password: '123johndoe',
      });
      await user.save();
      const expected = 'John Doe';
      const actual = user.name;
      expect(actual).toEqual(expected);
    });
  });

  describe('read', () => {
    it('gets a user by name', async () => {
      const user = new User({
        name: 'John Doe',
        email: 'john@doe.com',
        password: '123johndoe',
      });
      await user.save();
      const foundUser = await User.findOne({ name: 'John Doe' });
      const expected = 'John Doe';
      const actual = foundUser.name;
      expect(actual).toEqual(expected);
    });
  });

  describe('update', () => {
    it('updates user info', async () => {
      const user = new User({
        name: 'John Doe',
        email: 'john@doe.com',
        password: '123johndoe',
      });
      await user.save();
      user.name = 'Jane Doe';
      await user.save();
      const updatedUser = await User.findOne({ name: 'Jane Doe' });
      const expected = 'Jane Doe';
      const actual = updatedUser.name;
      expect(actual).toEqual(expected);
    });
  });

  describe('delete', () => {
    it('delete user by id', async () => {
      const user = new User({
        name: 'John Doe',
        email: 'john@doe.com',
        password: '123johndoe',
      });
      await user.save();
      await User.remove({ _id: user.id });
      const deletedUser = await User.findOne({ name: 'Jane Doe' });
      const expected = null;
      const actual = deletedUser;
      expect(actual).toEqual(expected);
    });
  });
});
