const User = require("../models/User");
const requireAuth = require("../middlewares/requireAuth");

module.exports = app => {
  app.get("/currentUser", (req, res) => {
    res.send(req.user);
  });

  app.get("/logout", (req, res) => {
    res.logout();
    res.send(false);
  });

  app.get("/users", requireAuth, async (req, res) => {
    try {
      const { data } = await User.find({});
      res.send(data);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  app.put("/currentUser", requireAuth, async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: req._id
        },
        {
          ...req.body
        }
      );
      res.send(updatedUser);
    } catch (e) {
      res.sendStatus(500);
    }
  });
};
