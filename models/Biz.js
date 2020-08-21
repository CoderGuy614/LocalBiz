const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const BizSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "users",
  },
  categories: [
    {
      type: ObjectId,
      ref: "categories",
    },
  ],
  items: [
    {
      type: ObjectId,
      ref: "items",
    },
  ],
  name: {
    type: String,
    required: [true, "name is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  city: {
    type: String,
    required: [true, "city is required"],
    default: "Siem Reap",
  },
  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  hours: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Biz = mongoose.model("biz", BizSchema);
