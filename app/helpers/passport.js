const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { User } = require('../modules/users');
const config = require('../config');

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

passport.use(
  new FacebookStrategy(
    {
      clientID: config.passport.facebook.clientId,
      clientSecret: config.passport.facebook.clientSecret,
      callbackURL: config.passport.facebook.callbackURL,
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

passport.use(
  new TwitterStrategy(
    {
      consumerKey: config.passport.twitter.clientId,
      consumerSecret: config.passport.twitter.clientSecret,
      callbackURL: config.passport.twitter.callbackURL,
    },
    async (token, tokenSecret, profile, done) => {
      // retrieve user ...
      try {
        const user = {};
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: config.passport.google.clientId,
      clientSecret: config.passport.google.clientSecret,
      callbackURL: config.passport.google.callbackURL,
    },
    (token, tokenSecret, profile, done) => {
      // retrieve user ...
      const user = {};
      done(null, user);
    }
  )
);
