const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
	{
		user: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			requied: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Comment", commentSchema);
