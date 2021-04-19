const { number, date } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
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
        recommendUser: {
            type: Array,
        },
        comment: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        commentCnt: {
            type: Number,
            default: 0
        },
        user: {
            type: String,
            // required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", postSchema);
