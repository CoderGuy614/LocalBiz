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

exports.itemById = (req, res, next, id) => {
  Item.findById(id)
    // .populate("Category")
    .exec((err, item) => {
      if (err || !item) {
        return res.status(400).json({
          error: "Item not found",
        });
      }
      req.item = item;
      next();
    });
};

exports.read = (req, res) => {
  // req.item.photo = undefined;
  return res.json(req.item);
};

exports.listItems = (req, res) => {
  Item.find({ business: req.biz._id }).exec((err, items) => {
    if (err || !items) {
      return res
        .status(400)
        .json({ error: "No Items Found for This Business" });
    }
    return res.json(items);
  });
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    const { name, description, price, business } = fields;

    if (!name || !description || !price || !business) {
      return res.status(400).json({
        error: "Name, Description and Price are Required",
      });
    }

    if (files.photo) {
      upload.single("file");
      cloudinary.uploader.upload(files.photo.path).then((cloudinaryFile) => {
        fields.photo = cloudinaryFile.url;
        let item = new Item(fields);
        item.save((err, result) => {
          if (err) {
            console.log("Item Create Error ", err);
            return res.status(400).json({
              error: err,
            });
          }
          res.json(result);
        });
      });
    } else {
      let item = new Item(fields);
      item.save((err, result) => {
        if (err) {
          console.log("Item Create Error ", err);
          return res.status(400).json({
            error: err,
          });
        }
        res.json(result);
      });
    }
  });
};

exports.deleteItem = (req, res) => {
  let item = req.item;
  item.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "Item deleted successfully",
    });
  });
};
