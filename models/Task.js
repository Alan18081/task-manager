const mongoose = require("mongoose");

const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: String,
  description: String,
  status: String,
  esitmateTime: Boolean,
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  performer: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Task", TaskSchema);
