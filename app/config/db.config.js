const env = process.env.NODE_ENV || 'development';
const CONFIG = require('./index')[env];
const mongoose = require('mongoose');

const dbOptions = {
  useNewUrlParser: true,
  createIndexes: true,
};

async function connectDB() {
  try {
    const database = await mongoose.connect(
      CONFIG.db,
      dbOptions
    );
    console.log('✓ MongoDB connected successfuly.');
    return database;
  } catch (err) {
    console.log('✗ MongoDB Connection Error: ', err);
    process.exit();
  }
}

const db = connectDB();

module.exports = db;
