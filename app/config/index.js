const KEYS = require('./dummy.keys');
const CONFIG = {
  development: {
    apiVersion: 'api/v1',
    clientHost: 'http://localhost:3000',
    db: KEYS.mongodb || 'mongodb://127.0.0.1/koakit',
    port: 8000,
    sessionKey: KEYS.sessionKey,
  },

  production: {
    apiVersion: 'api/v1',
    clientHost: 'http://koakit.com:3000',
    db: KEYS.mongodb,
    port: 8080,
    sessionKey: KEYS.sessionKey,
  },
};

module.exports = CONFIG;
