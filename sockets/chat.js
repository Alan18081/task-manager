const mongoose = require("mongoose");

const Message = mongoose.model("Message");
const Chat = mongoose.model("Chat");

module.exports = io => {
  io.on("connection", socket => {
    socket.on("newUser", ({ roomId }) => {
      socket.join(roomId);
    });

    socket.on(
      "newMessage",
      async ({ message: { text, createdAt, author }, roomId }) => {
        const newMessage = new Message({
          author,
          text,
          createdAt
        });
        await Promise.all([
          Chat.updateOne(
            {
              _id: roomId
            },
            {
              $push: {
                messages: newMessage
              }
            }
          ),
          Message.populate(newMessage, {
            path: "author",
            model: "User"
          })
        ]);
        io.to(roomId).emit("message", newMessage);
      }
    );

    socket.on("leaveRoom", ({ roomId }) => {
      socket.leave(roomId);
    });
  });
};
