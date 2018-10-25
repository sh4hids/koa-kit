const KEYS = require('./dummy.keys');
const CONFIG = {
  clientHost: 'http://localhost:3000',
  apiVersion: 'api/v1',

  development: {
    db: KEYS.mongodb || 'mongodb://127.0.0.1/koakit',
    port: 8000,
  },

  production: {
    db: KEYS.mongodb,
    port: 8080,
  },
};

module.exports = CONFIG;
