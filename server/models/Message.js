const mongoose = require("mongoose");

const { Schema } = mongoose;

const MessageSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  text: String,
  createdAt: Date,
  taskId: String,
  chatId: String
});

module.exports = mongoose.model("Message", MessageSchema);
