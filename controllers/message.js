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
  return res.status(200).json({ message: "This will be the read Method" });
};
