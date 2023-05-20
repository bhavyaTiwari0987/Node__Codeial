const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

// tell passport to use new starategy for google login
passport.use(
  new googleStrategy(
    {
      clientID: "401895186341-4o74e39rqteel8otn8nch7n3dna4q2mt.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },

    async function (accessToken, refreshToken, profile, done) {
      // find a user
      try {
        const currentUser = await User.findOne({
          email: profile.emails[0].value,
        });
        // console.log(profile);
        // if found, set this user as req.user
        if (currentUser) {
          return done(null, currentUser);
        } else {
          // if not found, cerate the user and set it as req.user
          const newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
          });
          if (newUser) {
            return done(null, newUser);
          }
        }
      } catch (err) {
        console.log("Error", err);
      }
    }
  )
);

module.exports = passport;
