const passport = require("passport");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const User = require("../models/User");

module.exports = {
  async getCurrentUser(req, res) {
    try {
      res.send(req.user || false);
    } catch (e) {
      res.sendStatus(500);
    }
  },
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: req.user._id
        },
        {
          ...req.body
        },
        {
          new: true
        }
      );
      res.send(updatedUser);
    } catch (e) {
      res.sendStatus(500);
    }
  },
  async getAllUsers(req, res) {
    try {
      const { data } = await User.find({});
      res.send(data);
    } catch (e) {
      res.sendStatus(500);
    }
  },
  login(req, res) {
    passport.authenticate(
      "local.login",
      { session: false },
      (err, user, info) => {
        if (err) {
          return res.sendStatus(500);
        }
        if (info) {
          return res.status(401).send(info);
        }
        return req.login(user, { session: false }, loginError => {
          if (loginError) {
            return res.sendStatus(500);
          }
          const token = jwt.sign(user.toJSON(), jwtSecret);
          return res.send({ user, token });
        });
      }
    )(req, res);
  },
  signUp(req, res) {
    passport.authenticate(
      "local.signup",
      { session: false },
      (err, user, info) => {
        if (err) {
          return res.sendStatus(500);
        }
        if (info) {
          return res.status(401).send(info);
        }
        return req.login(user, { session: false }, loginError => {
          if (loginError) {
            return res.sendStatus(500);
          }
          const token = jwt.sign(user.toJSON(), jwtSecret);
          return res.send({ user, token });
        });
      }
    )(req, res);
  },
  logout(req, res) {
    res.logout();
    res.send(false);
  }
};
