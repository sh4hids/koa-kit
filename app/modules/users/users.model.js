const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    password: String,
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
    },
    role: {
      type: String,
      enum: ['admin', 'moderator', 'general'],
      default: 'general',
    },
    facebook: {
      id: String,
      token: String,
      name: String,
      email: String,
    },
    twitter: {
      id: String,
      token: String,
      name: String,
      username: String,
    },
    google: {
      id: String,
      token: String,
      name: String,
      email: String,
    },
    lastLogout: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hashSync(
    this.password,
    bcrypt.genSaltSync(8),
    null
  );
  next();
});

userSchema.methods.validatePassword = async function(password) {
  try {
    return await bcrypt.compareSync(password, this.password);
  } catch (err) {
    throw new Error('Hash compare failed!', err);
  }
};

module.exports = mongoose.model('User', userSchema);
