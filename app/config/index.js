const KEYS = require('./dummy.keys');
const CONFIG = {
  development: {
    apiVersion: 'api/v1',
    clientHost: 'http://localhost:3000',
    db: KEYS.mongodb || 'mongodb://127.0.0.1/koakit',
    port: 8000,
    session: {
      key: KEYS.sessionKey,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    authKeys: KEYS.authKeys,
    jwt: {
      secret: KEYS.jwtKey,
      expiresIn: 7 * 24 * 60 * 60,
    },
  },

  production: {
    apiVersion: 'api/v1',
    clientHost: 'http://koakit.com:3000',
    db: KEYS.mongodb,
    port: 8080,
    session: {
      key: KEYS.sessionKey,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    authKeys: KEYS.authKeys,
    jwt: {
      secret: KEYS.jwtKey,
      expiresIn: 7 * 24 * 60 * 60 * 1000,
    },
  },
};

module.exports = CONFIG;
