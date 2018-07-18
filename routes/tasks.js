const Task = require("../models/Task");
const Message = require("../models/Message");
const requireAuth = require("../middlewares/requireAuth");
const requireAdmin = require("../middlewares/requireAdmin");

module.exports = app => {
  app.get("/tasks", requireAuth, async (req, res) => {
    try {
      const tasks = await Task.find({
        $or: [{ worker: req.user._id }, { creator: req.user._id }]
      });
      res.send(tasks);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  app.get("/tasks/all", async (req, res) => {
    try {
      const tasks = await Task.find({}).populate("comments");
      res.send(tasks);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  app.post("/tasks", requireAuth, requireAdmin, async (req, res) => {
    try {
      const newTask = new Task({
        ...req.body
      });
      await newTask.save();
      res.send(newTask);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  app.patch("/tasks/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const updatedTask = await Task.findOneAndUpdate(
        {
          _id: id
        },
        {
          ...req.body
        }
      );
      res.send(updatedTask);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  app.get("/tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findOne({ _id: id }).populate("comments");
      res.send(task);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  app.post("/tasks/:id/addComment", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const newComment = new Message({
        author: req.user._id,
        text: req.body.comment,
        createdAt: new Date()
      });
      const task = await Task.findOneAndUpdate(
        {
          _id: id
        },
        {
          $push: {
            comments: newComment._id
          }
        }
      ).populate("comments");
      res.send(task);
    } catch (e) {
      res.sendStatus(500);
    }
  });
};
