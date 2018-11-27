const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  password: String,
  email: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  facebookId: String,
  googleId: String,
  githubId: String,
});

// Generate password hash
userSchema.methods.generateHash = async function(password) {
  try {
    return await bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  } catch (err) {
    throw new Error('Hashing failed!', err);
  }
};

// Check if password is valid
userSchema.methods.validPassword = async function(password) {
  try {
    return await bcrypt.compareSync(password, this.password);
  } catch (err) {
    throw new Error('Hash compare failed!', err);
  }
};

module.exports = mongoose.model('User', userSchema);
