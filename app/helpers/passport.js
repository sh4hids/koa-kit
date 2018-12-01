const env = process.env.NODE_ENV || 'development';
const passport = require('koa-passport');
const { User } = require('../modules/users');
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
const localConfig = {
  usernameField: 'email',
};
passport.use(
  new LocalStrategy(localConfig, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user || (await !user.validatePassword(password))) {
        done(null, false);
      }
      // user.varified = true;
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  })
);

const FacebookStrategy = require('passport-facebook').Strategy;
passport.use(
  new FacebookStrategy(
    {
      clientID: CONFIG.authKeys.facebook.clientId,
      clientSecret: CONFIG.authKeys.facebook.clientSecret,
      callbackURL: `http://localhost:8000/auth/facebook/redirect`,
    },
    async (token, tokenSecret, profile, done) => {
      // retrieve user ...

      try {
        const user = await User.findOne({
          'facebook.id': profile.id,
        });
        if (!user) {
          const newUser = new User();
          newUser.name = profile.displayName;
          newUser.facebook.id = profile.id;
          newUser.facebook.name = profile.displayName;
          newUser.facebook.token = token;

          const userData = await newUser.save();
          done(null, userData);
        }

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

const TwitterStrategy = require('passport-twitter').Strategy;
passport.use(
  new TwitterStrategy(
    {
      consumerKey: CONFIG.authKeys.twitter.clientId,
      consumerSecret: CONFIG.authKeys.twitter.clientSecret,
      callbackURL: `${CONFIG.clientHost}/auth/twitter/redirect`,
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
//       callbackURL: `${CONFIG.clientHost}/auth/google/redirect`,
//     },
//     function(token, tokenSecret, profile, done) {
//       // retrieve user ...
//       fetchUser().then(user => done(null, user));
//     }
//   )
// );
