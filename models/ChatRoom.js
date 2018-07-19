const mongoose = require("mongoose");

const { Schema } = mongoose;

const ChatRoomSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message"
    }
  ]
});

module.exports = mongoose.model("ChatRoom", ChatRoomSchema);
