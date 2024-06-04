const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  items: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imgUrl: {
      type: String,
      required: true
    }
  }],
  link: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);