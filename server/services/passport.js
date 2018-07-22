const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const User = require("../models/User");
const { jwtSecret } = require("../config/index");

const { ExtractJwt } = passportJWT;
const JWTStrategy = passportJWT.Strategy;

passport.use(
  "local.login",
  new LocalStrategy(
    {
      usernameField: "login",
      passwordField: "password"
    },
    async (login, password, cb) => {
      try {
        const user = await User.findOne({
          $or: [{ email: login }, { name: login }]
        });
        if (!user) {
          return cb(null, false, { message: "No user with this login" });
        }
        if (!user.validatePassword(password)) {
          return cb(null, false, { message: "Wrong password" });
        }

        return cb(null, user);
      } catch (e) {
        return cb(e);
      }
    }
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, email, password, cb) => {
      try {
        const user = await User.findOne({ email });
        if (user) {
          return cb(null, false, {
            message: "User with this email already exists"
          });
        }
        const newUser = new User({
          name: req.body.name,
          email
        });
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        return cb(null, newUser);
      } catch (e) {
        return cb(e);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret
    },
    async (jwtPayload, cb) => {
      try {
        const user = await User.findOne({ _id: jwtPayload });
        cb(null, user);
      } catch (e) {
        cb(e);
      }
    }
  )
);
