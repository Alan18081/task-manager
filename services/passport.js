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
        const user = await User.findOne({ email });
        if (!user) {
          return cb(null, false, { error: "No user with this login" });
        }
        if (!user.compareSync(password)) {
          return cb(null, false, { error: "Wrong password" });
        }
        cb(null, user);
      } catch (e) {
        return cb(e);
      }
    }
  )
);
