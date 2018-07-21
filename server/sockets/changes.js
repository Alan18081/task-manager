module.exports = io => {
  io.on('connection', socket => {
    socket.on('onCreateTask', task => {
      console.log('created new task',task);
      io.sockets.emit('createdTask', task);
    });

    socket.on('onChangeTask', task => {
      io.sockets.emit('changedTask', task);
    });

    socket.on('onRemoveTask', task => {
      io.sockets.emit('removedTask',task);
    });
  });
};