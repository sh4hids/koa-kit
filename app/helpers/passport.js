const env = process.env.NODE_ENV || 'development';
const passport = require('koa-passport');
const { User } = require('../components/users');
const CONFIG = require('../config')[env];

const fetchUser = (() => {
  // This is an example! Use password hashing in your project and avoid storing passwords in your code
  const user = { id: 1, username: 'test', password: 'test' };
  return async function() {
    return user;
  };
})();

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await fetchUser();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const LocalStrategy = require('passport-local').Strategy;
passport.use(
  new LocalStrategy(function(username, password, done) {
    fetchUser()
      .then(user => {
        if (username === user.username && password === user.password) {
          user.verified = true;
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch(err => done(err));
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