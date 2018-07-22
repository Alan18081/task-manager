module.exports = io => {
  io.on("connection", socket => {
    socket.on("newUser", ({ roomId }) => {
      socket.join(roomId);
    });

    socket.on("leaveRoom", ({ roomId }) => {
      socket.leave(roomId);
    });
  });
};
