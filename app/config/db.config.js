const mongoose = require('mongoose');
const config = require('./');

const dbOptions = {
  useNewUrlParser: true,
  createIndexes: true,
};

/* eslint-disable no-console */
async function connectDB() {
  try {
    const database = await mongoose.connect(config.db, dbOptions);
    console.log('✓ MongoDB connected successfuly.');
    return database;
  } catch (err) {
    console.log('✗ MongoDB Connection Error: ', err);
    process.exit();
    return false;
  }
}

const db = connectDB();

module.exports = db;
