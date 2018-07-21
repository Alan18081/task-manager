const TasksController = require("../controllers/tasks");
const requireAuth = require("../middlewares/requireAuth");
const requireAdmin = require("../middlewares/requireAdmin");

module.exports = app => {

  app.get("/tasks", requireAuth, TasksController.getUserTasks);

  app.get("/tasks/all", requireAuth, TasksController.getAllTasks);

  app.post("/tasks", requireAuth, requireAdmin,TasksController.createTask);

  app.patch("/tasks/:id", requireAuth, TasksController.updateTask);

  app.get("/tasks/:id", requireAuth, TasksController.getTaskById);

  app.delete(
    "/tasks/:id",
    requireAuth,
    requireAdmin,
    TasksController.removeTask
  );

  app.patch(
    "/tasks/:id/addMessage",
    requireAuth,
    TasksController.addMessageToTask
  );

  app.delete(
    "/tasks/:taskId/messages/:msgId",
    requireAuth,
    TasksController.removeTaskMessage
  );

  app.put(
    "/tasks/:taskId/messages/:msgId",
    requireAuth,
    TasksController.updateTaskMessage
  );
};
