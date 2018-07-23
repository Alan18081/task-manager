const TasksController = require("../controllers/tasks");
const requireAuth = require("../middlewares/requireAuth");
const requireAdmin = require("../middlewares/requireAdmin");

module.exports = app => {

  app.get("/users/:id/tasks", requireAuth, TasksController.getUserTasks);

  app.get("/tasks", requireAuth, TasksController.getAllTasks);

  app.post("/tasks", requireAuth, requireAdmin,TasksController.createTask);

  app.patch("/tasks/:id", requireAuth, TasksController.updateTask);

  app.get("/tasks/:id", requireAuth, TasksController.getTaskById);


  app.delete(
    "/tasks/:id",
    requireAuth,
    requireAdmin,
    TasksController.removeTask
  );
};
