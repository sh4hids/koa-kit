const env = process.env.NODE_ENV || 'development';
const CONFIG = require('./index')[env];
const mongoose = require('mongoose');

const dbOptions = {
  useNewUrlParser: true,
  createIndexes: true,
};

const db = mongoose
  .connect(
    CONFIG.db,
    dbOptions
  )
  .then(
    () => {
      console.log('✓ MongoDB connected successfuly.');
    },
    err => {
      if (err) {
        console.log('MongoDB Connection Error: ', err);
        //process.exit();
      }
    }
  );

module.exports = db;
