const mongoose = require("mongoose");

const User = mongoose.model("User");

module.exports = io => {
  const onlineUsers = [];
  io.on('connection', socket => {
    console.log("Hey");
    socket.on('attendOnlineUser', async ({userId}) => {
      onlineUsers.push({
        userId,
        userSocket: socket
      });
      console.log(userId);
      const updatedUser = await User.findOneAndUpdate({
        _id: userId
      }, {
        online: true
      },{
        new: true
      });
      io.sockets.emit("newOnlineUser",updatedUser);
    });
    socket.on('disconnect', async () => {
      const removedSocketIndex = onlineUsers.findIndex(({userSocket}) => userSocket === socket);
      const {userId} = onlineUsers[removedSocketIndex];
      const updatedUser = await User.findOneAndUpdate({
        _id: userId
      }, {
        online: false
      },{
        new: true
      });
      onlineUsers.splice(removedSocketIndex,1);
      console.log(updatedUser);
      console.log("Disconnect");
      io.sockets.emit("newOfflineUser", updatedUser);
    });
    socket.on("onNewOfflineUser", async ({userId}) => {
      const updatedUser = await User.findOneAndUpdate({
        _id: userId
      }, {
        online: false
      },{
        new: true
      });
      console.log(updatedUser);
      console.log("Logout");
      io.sockets.emit("newOfflineUser", updatedUser);
    });
  });
};