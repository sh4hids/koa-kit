module.exports = {
  development: {
    api: 'API_VERSION',
    client: 'CLIENT_URL',
    serverHost: 'SERVER_HOST',
    serverPort: 'SERVER_PORT',
    db: 'DB_URL',
    passport: {
      facebook: {
        clientId: '',
        clientSecret: '',
        callbackURL: '',
      },
      twitter: {
        clientId: '',
        clientSecret: '',
        callbackURL: '',
      },
      google: {
        clientId: '',
        clientSecret: '',
        callbackURL: '',
      },
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
    serverHost: 'SERVER_HOST',
    serverPort: 'SERVER_PORT',
    db: 'DB_URL',
    passport: {
      facebook: {
        clientId: '',
        clientSecret: '',
        callbackURL: '',
      },
      twitter: {
        clientId: '',
        clientSecret: '',
        callbackURL: '',
      },
      google: {
        clientId: '',
        clientSecret: '',
        callbackURL: '',
      },
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
