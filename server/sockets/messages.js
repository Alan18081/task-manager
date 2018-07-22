const mongoose = require("mongoose");

const Message = mongoose.model("Message");

module.exports = io => {
  io.on("connection", socket => {

    socket.on(
      "sendChatMessage",
      async ({ message, roomId }) => {
        const newMessage = new Message({
          ...message,
          chatId: roomId
        });
        await Promise.all([
          Message.populate(newMessage, {
            path: "author",
            model: "User"
          }),
          newMessage.save()
        ]);
        io.to(roomId).emit("addedMessage", newMessage);
      }
    );

    socket.on(
      "sendTaskMessage",
      async ({ message, id }) => {
        const newMessage = new Message({
          ...message,
          taskId: id
        });
        await Promise.all([
          Message.populate(newMessage, {
            path: "author",
            model: "User"
          }),
          newMessage.save()
        ]);
        io.sockets.emit("addedMessage", newMessage);
      }
    );

    socket.on("editChatMessage", async ({ text, roomId, messageId }) => {
      const updatedMessage = await Message.findOneAndUpdate({
        _id: messageId
      }, {
        text
      },{
        new: true
      }).populate("author");
      io.to(roomId).emit("editedMessage",updatedMessage);
    });

    socket.on("editTaskMessage", async ({ text, messageId }) => {
      const updatedMessage = await Message.findOneAndUpdate({
        _id: messageId
      }, {
        text
      },{
        new: true
      }).populate("author");
      io.sockets.emit("editedMessage",updatedMessage);
    });

    socket.on("removeChatMessage", async ({messageId,roomId}) => {
      await Message.deleteOne(
        {
          _id: messageId
        }
      );
      io.to(roomId).emit("removedMessage",{id: messageId});
    });

    socket.on("removeTaskMessage", async ({messageId}) => {
      await Message.deleteOne(
        {
          _id: messageId
        }
      );
      io.sockets.emit("removedMessage",{id: messageId});
    });
  });
};