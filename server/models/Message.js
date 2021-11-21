const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    conversationId: {
      type: String,
    },
    sender: String,
    text: String,
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema)

module.exports = Message
