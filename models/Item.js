const mongoose = require("mongoose");

module.exports = mongoose.model("items", {
  name: {
    type: String,
    required: [true, "name is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  canDeliver: {
    type: Boolean,
    default: false,
  },
});
