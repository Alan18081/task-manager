const mongoose = require("mongoose");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

const User = mongoose.model("User");
const Chat = mongoose.model("Chat");

module.exports = {
  async getCurrentUser(req, res) {
    try {
      res.send(req.user || false);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: req.user.id
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
      res.status(500).send(e);
    }
  },
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  login(req, res) {
    passport.authenticate(
      "local.login",
      { session: false },
      (err, user, info) => {
        if (err) {
          return res.status(500).send(err);
        }
        if (info) {
          return res.status(401).send({
            errors: [info]
          });
        }
        return req.login(user, { session: false }, loginError => {
          if (loginError) {
            return res.status(500).send(loginError);
          }
          const token = jwt.sign(user.id, jwtSecret);
          return res.send({ user, token });
        });
      }
    )(req, res);
  },
  signUp(req, res) {
    console.log(req.body);
    passport.authenticate(
      "local.signup",
      { session: false },
      (err, user, info) => {
        if (err) {
          return res.status(500).send(err);
        }
        if (info) {
          return res.status(401).send({
            errors: [info]
          });
        }
        return req.login(user, { session: false }, loginError => {
          if (loginError) {
            return res.status(500).send(loginError);
          }
          const token = jwt.sign(user.id, jwtSecret);
          return res.send({ user, token });
        });
      }
    )(req, res);
  },
  logout(req, res) {
    req.logout();
    res.send(false);
  },
  async getUserChat(req, res) {
    try {
      const { id } = req.params;
      const chat = await Chat.findOne({
        users: {
          $in: [req.user.id, id]
        }
      })
        .populate("users")
        .populate("messages");
      if (!chat) {
        const newChat = new Chat({
          users: [req.user.id, id],
          messages: []
        });
        await Promise.all([
          Chat.populate(newChat, {
            path: "users",
            model: "User"
          }),
          newChat.save()
        ]);
        res.send(newChat);
      } else {
        res.send(chat);
      }
    } catch (e) {
      res.status(500).send(e);
    }
  }
};
