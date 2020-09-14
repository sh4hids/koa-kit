const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenBlacklistSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('TokenBlacklist', tokenBlacklistSchema);
