const mongoose = require("mongoose");
const { stages } = require("../config");

const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: String,
  description: String,
  status: {
    type: String,
    default: stages[0]
  },
  esitmateTime: Boolean,
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  performer: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Task", TaskSchema);
