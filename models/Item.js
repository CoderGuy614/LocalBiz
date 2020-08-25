const mongoose = require("mongoose");

module.exports = mongoose.model("items", {
  name: {
    type: String,
    trim: true,
    maxlength: 32,
    required: [true, "name is required"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: 2000,
    required: [true, "description is required"],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    trim: true,
    maxlength: 32,
    required: [true, "price is required"],
  },
  canDeliver: {
    type: Boolean,
    default: false,
  },
  category: {
    type: ObjectId,
    ref: "Category",
  },
  business: {
    type: ObjectId,
    ref: "Biz",
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
});
