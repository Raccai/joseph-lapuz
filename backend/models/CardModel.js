const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardSchema = new Schema ({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  button: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Card", cardSchema);