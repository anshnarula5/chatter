const mongoose = require("mongoose")
const {Schema} = mongoose
const User = require("../models/User")
const Message = require("../models/Message")

const conversationSchema = new Schema({
    messages: {
        type: [Schema.Types.ObjectId],
        ref : "Message"
    },
    users: {
        type: [Schema.Types.ObjectId],
        ref  : "User"
    }
},
{timestamps : true}
)

const Conversation = mongoose.model("Conversation", conversationSchema)

module.exports = Conversation