module.exports = {
  development: {
    api: '/api/v1',
    client: 'http://localhost:3000',
    server: 'http://localhost:8000',
    db: 'mongodb://127.0.0.1/koakit',
    passport: {
      facebook: {},
      google: {},
      github: {},
    },
    session: {
      key: '',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    jwt: {
      secret: '',
      expiresIn: 7 * 24 * 60 * 60,
    },
  },

  production: {
    api: 'API_VERSION',
    client: 'CLIENT_URL',
    server: 'SERVER_URL',
    db: 'DB_URL',
    passport: {
      facebook: {},
      google: {},
      github: {},
    },
    session: {
      key: '',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    jwt: {
      secret: '',
      expiresIn: 7 * 24 * 60 * 60,
    },
  },
};
