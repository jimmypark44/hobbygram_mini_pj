const { number, date } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema(
	{
		user: {
			type: String,
		},
		content: {
			type: String,
		},
		updateAt: {
			type: Number,
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
			default: 0,
		},
		recommedUser: {
			type: Array,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Post", PostSchema);