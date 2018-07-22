const MessagesController = require("../controllers/messages");
const requireAuth = require("../middlewares/requireAuth");

module.exports = app => {
  app.get("/tasks/:id/messages", requireAuth, MessagesController.getTaskMessages);

  app.get("/chats/:id/messages", requireAuth, MessagesController.getChatMessages);

  app.post("/tasks/:taskId/messages",requireAuth , MessagesController.addTaskMessage);

  app.patch("/messages/:id",requireAuth  , MessagesController.updateMessage);

  app.delete("/messages/:id",requireAuth , MessagesController.removeMessage);
};