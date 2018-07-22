const mongoose = require("mongoose");

const Task = mongoose.model("Task");

module.exports = io => {
  io.on("connection", socket => {
    socket.on("onCreateTask", async task => {
      const newTask = new Task({
        ...task
      });
      await Promise.all([
        Task.populate(newTask,[
          {
            path: "creator",
            model: "User"
          },
          {
            path: "performer",
            model: "User"
          }
        ]),
        newTask.save()
      ]);
      io.sockets.emit("createdTask", newTask);
    });

    socket.on("onChangeTask", async ({id,task}) => {
      const updatedTask = await Task.findOneAndUpdate(
        {
          _id: id
        },
        {
          ...task
        },
        {
          new: true
        }
      ).populate("creator").populate("performer");
      io.sockets.emit("changedTask", updatedTask);
    });

    socket.on("onRemoveTask", async ({id}) => {
      await Task.deleteOne(
        {
          _id: id
        }
      );
      io.sockets.emit("removedTask", {id});
    });
  });
};