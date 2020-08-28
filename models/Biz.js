const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const BizSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "user",
  },
  category: {
    type: ObjectId,
    ref: "category",
  },
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
  bizEmail: {
    type: String,
    required: true,
    default: "myBusiness@localBiz.com",
  },
  bizPhone: {
    type: String,
    required: true,
    default: "000-000-0000",
  },
  lat: {
    type: Number,
    default: 13.3633,
  },
  lng: {
    type: Number,
    default: 103.8564,
  },
  rating: {
    type: Number,
  },
  hours: {
    type: Array,
  },
  photo: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Biz = mongoose.model("biz", BizSchema);
