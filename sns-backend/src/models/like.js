const mongoose = require("mongoose");
const { Schema } = mongoose;

const Like = new Schema({
  tolikeuser: { type: String, required: true },
  fromlikeuser: { type: String, required: true }
});

module.exports = mongoose.model('Like',Like)