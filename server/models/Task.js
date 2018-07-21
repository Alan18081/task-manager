const mongoose = require("mongoose");
const { stages } = require("../config/index");

const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: String,
  description: String,
  status: {
    type: String,
    default: stages[0]
  },
  estimateTime: String,
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  performer: { type: Schema.Types.ObjectId, ref: "User" }
});

const Task = mongoose.model("Task", TaskSchema, "Task");
