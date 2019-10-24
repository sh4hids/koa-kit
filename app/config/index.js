module.exports = {
  appEnv: process.env.APP_ENV || 'development',
  apiVersion: process.env.API_VERSION || '/api/v1',
  appHost: process.env.APP_HOST || 'localhost',
  appPort: process.env.APP_PORT || '8000',
  db: process.env.APP_DB_URL || 'mongodb://localhost:27017/koakitdb',
  passport: {
    facebook: {
      clientId: process.env.FB_CLIENT_ID || 'notaclientid',
      clientSecret: process.env.FB_CLIENT_SECRET || 'notaclientsecret',
      callbackURL:
        process.env.FB_CALLBACK_URL ||
        'http://localhost:8000/auth/redirect/facebook',
    },
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID || 'notaclientid',
      clientSecret: process.env.TWITTER_CLIENT_SECRET || 'notaclientsecret',
      callbackURL:
        process.env.TWITTER_CALLBACK_URL ||
        'http://localhost:8000/auth/redirect/twitter',
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || 'notaclientid',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'notaclientsecret',
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        'http://localhost:8000/auth/redirect/google',
    },
  },
  session: {
    key: process.env.APP_SESSION_KEY || 'verysecretkey',
    maxAge: process.env.APP_SESSION_KEY_AGE || 7 * 24 * 60 * 60 * 1000,
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY || 'verysecretkey',
    expiresIn: process.env.JWT_SECRET_KEY_AGE || 7 * 24 * 60 * 60,
  },
};
