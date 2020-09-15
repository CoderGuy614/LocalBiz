const Message = require("../models/Message");

exports.create = (req, res) => {
  if (!req.profile || !req.biz || !req.item) {
    return res
      .status(400)
      .json({ error: "Couldn't send your message. Please try again." });
  }
  const fromUserId = req.profile._id;
  const toUserId = req.biz.user._id;
  const bizId = req.biz._id;
  const itemId = req.item._id;
  const { text } = req.body;
  let message = new Message({
    from: fromUserId,
    to: toUserId,
    biz: bizId,
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

exports.readByUser = (req, res) => {
  Message.find({
    $or: [{ from: req.profile._id }, { to: req.profile._id }],
  })
    .populate({
      path: "from",
      select: "name email avatar",
    })
    .populate({
      path: "to",
      select: "name email avatar",
    })
    .populate({
      path: "biz",
      select: "name photo",
    })
    .populate({
      path: "item",
      select: "name photo description price",
    })
    .exec((err, messages) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      if (!messages || messages.length === 0) {
        return res.status(400).json({ error: "No Messages Found" });
      }
      return res.json(messages);
    });
};
