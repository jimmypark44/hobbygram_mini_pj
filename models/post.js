const { number } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
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
		type: Number,
	},
	recommedUser: {
		type: Array,
	},
	// commentCnt: {
	// 	type: number,
	// },
});

module.exports = mongoose.model("Post", PostSchema);
