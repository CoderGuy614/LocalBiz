const Item = require("../models/Item");
const formidable = require("formidable");
const fs = require("fs");

exports.itemById = (req, res, next, id) => {
  Item.findById(id)
    .populate("category")
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
  req.item.photo = undefined;
  return res.json(req.item);
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    const {
      name,
      description,
      price,
      category,
      business,
      canDeliver,
      inStock,
    } = fields;
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        error: "All Fields are Required",
      });
    }
    let item = new Item(fields);

    // if (files.photo) {
    //     // console.log("FILES PHOTO: ", files.photo);
    //     if (files.photo.size > 1000000) {
    //         return res.status(400).json({
    //             error: 'Image should be less than 1mb in size'
    //         });
    //     }
    //     product.photo.data = fs.readFileSync(files.photo.path);
    //     product.photo.contentType = files.photo.type;
    // }

    item.save((err, result) => {
      if (err) {
        console.log("Item CREATE ERROR ", err);
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
  });
};
