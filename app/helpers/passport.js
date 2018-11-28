const env = process.env.NODE_ENV || 'development';
const passport = require('koa-passport');
const { User } = require('../components/users');
const CONFIG = require('../config')[env];

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findOne({ _id: id });
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

const LocalStrategy = require('passport-local').Strategy;
const localOpts = {
  usernameField: 'email',
};
passport.use(
  new LocalStrategy(localOpts, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user || !User.validatePassword(password)) {
        return done(null, false);
      }
      user.varified = true;
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

const FacebookStrategy = require('passport-facebook').Strategy;
passport.use(
  new FacebookStrategy(
    {
      clientID: 'your-client-id',
      clientSecret: 'your-secret',
      callbackURL: `${CONFIG.clientHost}/auth/facebook/callback`,
    },
    function(token, tokenSecret, profile, done) {
      // retrieve user ...
      fetchUser().then(user => done(null, user));
    }
  )
);

const TwitterStrategy = require('passport-twitter').Strategy;
passport.use(
  new TwitterStrategy(
    {
      consumerKey: 'your-consumer-key',
      consumerSecret: 'your-secret',
      callbackURL: `${CONFIG.clientHost}/auth/twitter/callback`,
    },
    function(token, tokenSecret, profile, done) {
      // retrieve user ...
      fetchUser().then(user => done(null, user));
    }
  )
);

// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// passport.use(
//   new GoogleStrategy(
//     {
//       clientId: 'your-client-id',
//       clientSecret: 'your-secret',
//       callbackURL: `${CONFIG.clientHost}/auth/google/callback`,
//     },
//     function(token, tokenSecret, profile, done) {
//       // retrieve user ...
//       fetchUser().then(user => done(null, user));
//     }
//   )
// );
