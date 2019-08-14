const mongoose = require("mongoose");

const { Schema } = mongoose;

const BuildingSpec = new Schema({
  address: { type: String },
  startDate: Date,
  endDate: Date
});

const Board = new Schema({
  _id: Schema.Types.ObjectId,
  title: { type: String, required: true },
  content: { type: String },
  writer: { type: String, required: true },
  publishedDate: {
    type: Date,
    default: new Date()
  },
  contentimg: [
    {
      imgname: { type: String },
      publishedDate: { type: Date }
    }
  ],
  thumbimg: {
    imgname: { type: String },
    publishedDate: { type: Date, default: new Date() }
  },
  buildingSpec: BuildingSpec
});

module.exports = mongoose.model("Board", Board);
