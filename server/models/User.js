const mongoose = require("mongoose")
const {Schema} = mongoose
const Conversation = require("./Conversation")
const userSchema = new Schema({
    name: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required : true
    },
    image: {
        type: String,
        default : "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png"
    },
    conversations: {
        type: [Schema.Types.ObjectId],
        ref : "Conversation"
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User