const mongoose = require("mongoose")
const {Schema} = mongoose

const conversationSchema = new Schema({
    members: {
        type : Array
    },
},
{timestamps : true}
)

const Conversation = mongoose.model("Conversation", conversationSchema)

module.exports = Conversation