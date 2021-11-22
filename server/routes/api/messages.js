const router = require("express").Router();
const auth = require("../../middleware/auth");
const Message = require("../../models/Message");
const Conversation = require("../../models/Conversation");

//add

router.post("/", auth, async (req, res) => {
  
  try {
    if (req.body.text.trim().length > 0) {
      const newMessage = new Message({conversationId: req.body.conversationId, text : req.body.text, sender : req.user.id})
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:conversationId", auth, async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
