const router = require("express").Router();
const auth = require("../../middleware/auth");
const Conversation = require("../../models/Conversation");
const User = require("../../models/User");

//new conv

router.post("/", auth, async (req, res) => {
  try {
    let user1 = await User.findById(req.user.id);
    let user2 = await User.findById(req.body.receiverId);
    const newConvo = new Conversation({ users : [user1, user2] });
    await newConvo.save();
    user1.conversations.unshift(newConvo._id);
    user2.conversations.unshift(newConvo._id);
    await user1.save();
    await user2.save();
    res.json(newConvo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/", auth, async (req, res) => {
  try {
    //   const trek = await Trek.findById(id).populate({
    //     path: "reviews",
    //     populate: {
    //         path: "author"
    //     }
    // }).populate("author")
    const user = await User.findById(req.user.id)
      .populate("conversations")
      .populate({path: "conversations", populate: {path: "users"}})
    const conversations = user.conversations;
    res.status(200).json(conversations);
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
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
