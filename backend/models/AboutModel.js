const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const aboutSchema = new Schema({
  imgUrl1: {
    type: String,
    required: true
  },
  imgUrl2: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("About", aboutSchema);