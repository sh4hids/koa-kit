const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  facebookId: String,
  googleId: String,
  githubId: String,
});

module.exports = mongoose.model('User', userSchema);
