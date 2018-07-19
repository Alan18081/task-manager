const mongoose = require("mongoose");

const Task = mongoose.model("Task");
const Message = mongoose.model("Message");

module.exports = {
  async getUserTasks(req, res) {
    try {
      const tasks = await Task.find({
        $or: [{ worker: req.user._id }, { creator: req.user._id }]
      }).populate("messages");
      res.send(tasks);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async getAllTasks(req, res) {
    try {
      const tasks = await Task.find({}).populate("messages");
      res.send(tasks);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async createTask(req, res) {
    try {
      const newTask = new Task({
        ...req.body,
        creator: req.user._id
      });
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
        author: req.user._id,
        text: req.body.comment,
        createdAt: new Date()
      });
      const [task] = await Promise.all([
        Task.findOneAndUpdate(
          {
            _id: id
          },
          {
            $push: {
              messages: newMessage._id
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
  }
};
