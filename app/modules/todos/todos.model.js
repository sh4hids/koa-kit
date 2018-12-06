const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    isDone: Boolean,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model('Todo', todoSchema);
