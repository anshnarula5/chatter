const router = require("express").Router();
const auth = require("../../middleware/auth");
const Conversation = require("../../models/Conversation");

//new conv

router.post("/", auth, async (req, res) => {
  try {
    const user1 = req.user.id
    const user2 = req.body.reciverId
    const newConvo = new Conversation({})
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/", auth, async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.user.id] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", auth, async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;