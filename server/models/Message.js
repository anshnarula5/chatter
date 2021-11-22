const mongoose = require("mongoose");
const {Schema} = mongoose;
const User = require("../models/User")
const Conversation = require("../models/Conversation")

const messageSchema = new Schema(
  {
    
    sender: {
      type : Schema.Types.ObjectId,
        ref : "User"
    },
    text: String,
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema)

module.exports = Message
