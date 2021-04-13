const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  user : {
    type: String,
    required: true,
  },
  content: {
    type: String,
    requied: true,
  },
  createAt: {
    type: Date,
    default: Date.now();
  }
})
