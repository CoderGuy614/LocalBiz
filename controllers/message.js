const Message = require("../models/Message");

exports.create = (req, res) => {
  if (!req.profile || !req.biz || !req.item) {
    return res
      .status(400)
      .json({ error: "Couldn't send your message. Please try again." });
  }

  const fromUserId = req.profile._id;
  const bizId = req.biz._id;
  const itemId = req.item._id;
  const { text } = req.body;

  let message = new Message({
    from: fromUserId,
    to: bizId,
    item: itemId,
    text,
  });
  message.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(result);
  });
};

exports.read = (req, res) => {
  Message.find({ to: req.biz._id }).exec((err, messages) => {
    console.log("Messages", messages);
    if (err) {
      return res.status(400).json({ error: err });
    }
    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: "No Messages Found" });
    }
    return res.json(messages);
  });
};
