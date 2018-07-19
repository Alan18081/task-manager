const Task = require("../models/Task");
const Message = require("../models/Task");

module.exports = {
  async getUserTasks(req, res) {
    try {
      const tasks = await Task.find({
        $or: [{ worker: req.user._id }, { creator: req.user._id }]
      });
      res.send(tasks);
    } catch (e) {
      res.sendStatus(500);
    }
  },
  async getAllTasks(req, res) {
    try {
      const tasks = await Task.find({}).populate("comments");
      res.send(tasks);
    } catch (e) {
      res.sendStatus(500);
    }
  },
  async createTask(req, res) {
    try {
      const newTask = new Task({
        ...req.body
      });
      await newTask.save();
      res.send(newTask);
    } catch (e) {
      res.sendStatus(500);
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
        }
      );
      res.send(updatedTask);
    } catch (e) {
      res.sendStatus(500);
    }
  },
  async getTaskById(req, res) {
    try {
      const { id } = req.params;
      const task = await Task.findOne({ _id: id }).populate("comments");
      res.send(task);
    } catch (e) {
      res.sendStatus(500);
    }
  },
  async addCommentToTask(req, res) {
    try {
      const { id } = req.params;
      const newComment = new Message({
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
              comments: newComment._id
            }
          }
        ).populate("comments"),
        Message.save()
      ]);
      res.send(task);
    } catch (e) {
      res.sendStatus(500);
    }
  }
};
