const mongoose = require("mongoose");

const Task = mongoose.model("Task");
const Message = mongoose.model("Message");

module.exports = {
  async getUserTasks(req, res) {
    try {
      const {id} = req.params;
      const tasks = await Task.find({
        $or: [{ performer: id }, { creator: id }]
      })
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
      await newTask.save();
      await Task.populate(newTask, [
        {
          path: "creator",
          model: "User"
        },
        {
          path: "performer",
          model: "User"
        }
      ]);
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
      )
        .populate("creator")
        .populate("performer");
      res.send(updatedTask);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async getTaskById(req, res) {
    try {
      const { id } = req.params;
      const task = await Task.findOne({ _id: id })
        .populate("creator")
        .populate("performer");
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
  },
};
