const env = process.env.NODE_ENV || 'development';
const passport = require('koa-passport');
const { User } = require('../modules/users');
const CONFIG = require('../config')[env];

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
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
      if (!user || !(await user.validatePassword(password))) {
        done(null, false);
      } else {
        done(null, user);
      }
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
      profileFields: ['id', 'displayName', 'emails'],
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
          newUser.email = profile.emails[0].value;
          newUser.facebook.id = profile.id;
          newUser.facebook.token = token;
          newUser.facebook.email = profile.emails[0].value;
          newUser.facebook.name = profile.displayName;

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
    async (token, tokenSecret, profile, done) => {
      // retrieve user ...
      try {
        const user = await fetchUser();
        done(null, user);
      } catch (err) {
        done(err, false);
      }
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
