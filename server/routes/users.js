const requireAuth = require("../middlewares/requireAuth");
const UsersController = require("../controllers/users");

module.exports = app => {
  app.post("/login", UsersController.login);

  app.post("/signup", UsersController.signUp);

  app.get("/currentUser", requireAuth, UsersController.getCurrentUser);

  app.get("/logout", UsersController.logout);

  app.get("/users", requireAuth, UsersController.getAllUsers);

  app.put("/currentUser", requireAuth, UsersController.updateUser);

  app.get("/users/:id/chat", requireAuth, UsersController.getUserChat);
};
