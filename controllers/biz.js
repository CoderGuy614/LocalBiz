const Biz = require("../models/Biz");
const Item = require("../models/Item");
const formidable = require("formidable");
const config = require("config");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage });

//Cloudinary Configuration
cloudinary.config({
  cloud_name: config.get("CLOUDINARY_CLOUD_NAME"),
  api_key: config.get("CLOUDINARY_API_KEY"),
  api_secret: config.get("CLOUDINARY_API_SECRET"),
});

exports.bizList = (req, res) => {
  let findCat = {};
  if (req.query.category !== "All") {
    findCat = { category: req.query.category };
  }
  Biz.find(findCat)
    .populate("user category")
    .exec((err, biz) => {
      if (err || !biz) {
        return res.status(400).json({ error: "No Businesses Found" });
      }
      return res.json(biz);
    });
};

exports.bizById = (req, res, next, id) => {
  Biz.findById(id)
    .populate("user")
    .exec((err, biz) => {
      console.log(err);
      if (err || !biz) {
        return res.status(400).json({
          error: "Business not found",
        });
      }
      req.biz = biz;
      next();
    });
};

exports.read = (req, res) => {
  return res.json(req.biz);
};

exports.create = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    fields.user = req.profile._id;
    if (files.photo) {
      upload.single("file");
      const cloudinaryFile = await cloudinary.uploader.upload(files.photo.path);
      fields.photo = cloudinaryFile.url;
    }
    let biz = new Biz(fields);
    biz.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
  });
};

exports.postHours = async (req, res) => {
  try {
    const id = req.biz._id;
    const updated = await Biz.findByIdAndUpdate(
      id,
      { hours: req.body },
      { new: true }
    );
    return res.json(updated);
  } catch (error) {
    console.log(err);
    return res.status(400).json({
      error: err,
    });
  }
};

exports.getHours = (req, res) => {
  Biz.findById(req.biz._id)
    .select("hours")
    .exec((err, hours) => {
      if (err || !hours) {
        return res.status(400).json({ error: "Error Getting Business Hours" });
      }
      return res.json(hours);
    });
};

exports.updateBiz = async (req, res) => {
  const id = req.biz._id;
  const { name, description, bizPhone, bizEmail } = req.body;
  const profileFields = {};
  if (name) profileFields.name = name;
  if (description) profileFields.description = description;
  if (bizEmail) profileFields.bizEmail = bizEmail;
  if (bizPhone) profileFields.bizPhone = bizPhone;

  try {
    let updatedBiz = await Biz.findByIdAndUpdate(
      id,
      { $set: profileFields },
      { new: true }
    );
    return res.json(updatedBiz);
  } catch (error) {
    console.log(err);
    return res.status(400).json({
      error: err,
    });
  }
};

exports.removeBiz = async (req, res) => {
  // Delete Items Which Belong to the THat Biz
  const bizId = req.biz._id;
  try {
    await Item.deleteMany({ business: bizId });
    await Biz.findByIdAndDelete(bizId);
    return res.json({ msg: "Biz Successfully Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};
