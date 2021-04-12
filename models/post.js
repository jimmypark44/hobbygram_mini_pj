const { number } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
	user: {
		type: String,
	},
	content: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	title: {
		type: String,
		required: true,
	},
	img: {
		type: String,
	},
	category: {
		type: String,
	},
	recommendCnt: {
		type: number,
	},
	commentCnt: {
		type: number,
	},
});

module.exports = mongoose.model("Post", postSchema);
