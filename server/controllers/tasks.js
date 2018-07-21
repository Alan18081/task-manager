const mongoose = require("mongoose");

const Task = mongoose.model("Task");
const Message = mongoose.model("Message");
module.exports = {
  async getUserTasks(req, res) {
    try {
      const tasks = await Task.find({
        $or: [{ performer: req.user.id }, { creator: req.user.id }]
      })
        .populate("messages")
        .populate("performer")
        .populate("creator")
        .populate({
          path: "messages",
          populate: {
            path: "author"
          }
        });
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
        .populate("creator")
        .populate({
          path: "messages",
          populate: {
            path: "author"
          }
        });
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
        .populate("messages")
        .populate("creator")
        .populate("performer")
        .populate({
          path: "messages",
          populate: {
            path: "author"
          }
        });
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
        .populate("performer")
        .populate({
          path: "messages",
          populate: {
            path: "author"
          }
        });
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
        )
          .populate("messages")
          .populate("creator")
          .populate("performer")
          .populate({
            path: "messages",
            populate: {
              path: "author"
            }
          }),
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
