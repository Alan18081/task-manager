const mongoose = require("mongoose");

const Message = mongoose.model("Message");

module.exports = {
  async removeMessage(req,res) {
    const {id} = req.params;
    try {
      await Message.deleteOne({
        _id: id
      });
      res.sendStatus(200);
    }
    catch (e) {
      res.status(500).send(e);
    }
  },
  async updateMessage(req,res) {
    const {id} = req.params;
    try {
      const message = await Message.findOneAndUpdate(
        {
          _id: id
        },
        {
          text: req.body.text
        },
        {
          new: true
        }
      ).populate("author");
      res.send(message);
    }
    catch (e) {
      res.status(500).send(e);
    }
  },
  async getTaskMessages(req,res) {
    const {id} = req.params;
    try {
      const messages = await Message.find({
        taskId: id
      }).populate("author");
      res.send(messages);
    }
    catch (e) {
      res.status(500).send(e);
    }
  },
  async getChatMessages(req,res) {
    const {id} = req.params;
    try {
      const messages = await Message.find({
        chatId: id
      }).populate("author");
      res.send(messages);
    }
    catch (e) {
      res.status(500).send(e);
    }
  },
  async addTaskMessage(req,res) {
    try {
      const {taskId} = req.params;
      const message = new Message({
        author: req.user.id,
        text: req.body.comment,
        createdAt: new Date(),
        taskId
      });
      await Promise.all([
        Message.populate(message,{
          path: "author",
          model: "User"
        }),
        message.save()
      ]);
      res.send(message);
    }
    catch (e) {
      res.status(500).send(e);
    }
  }
};