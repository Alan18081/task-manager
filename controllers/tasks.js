const mongoose = require("mongoose");

const Task = mongoose.model("Task");
const Message = mongoose.model("Message");

module.exports = {
  async getUserTasks(req, res) {
    try {
      const tasks = await Task.find({
        $or: [{ worker: req.user.id }, { creator: req.user.id }]
      })
        .populate("messages")
        .populate("performer")
        .populate("creator");
      res.send(tasks);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async getAllTasks(req, res) {
    try {
      const tasks = await Task.find({})
        .populate("messages")
        .populate("performer")
        .populate("creator");
      res.send(tasks);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async createTask(req, res) {
    try {
      const newTask = new Task({
        ...req.body,
        creator: req.user.id
      });
      const populatedTasks = await newTask.populate("messages");
      await newTask.save();
      res.send(newTask);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const updatedTask = await Task.findOneAndUpdate(
        {
          _id: id
        },
        {
          ...req.body
        },
        {
          new: true
        }
      ).populate("messages");
      res.send(updatedTask);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async getTaskById(req, res) {
    try {
      const { id } = req.params;
      const task = await Task.findOne({ _id: id }).populate("messages");
      res.send(task);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async addMessageToTask(req, res) {
    try {
      const { id } = req.params;
      const newMessage = new Message({
        author: req.user.id,
        text: req.body.comment,
        createdAt: new Date()
      });
      const [task] = await Promise.all([
        Task.findOneAndUpdate(
          {
            id
          },
          {
            $push: {
              messages: newMessage.id
            }
          },
          {
            new: true
          }
        ).populate("comments"),
        newMessage.save()
      ]);
      res.send(task);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async removeTask(req, res) {
    try {
      const { id } = req.params;
      await Task.deleteOne({ _id: id });
      res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
  }
};
