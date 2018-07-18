const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "login",
      passwordField: "password"
    },
    async (email, password, cb) => {
      try {
        const user = await User.findOne();
      } catch (e) {
        return cb(e);
      }
    }
  )
);
