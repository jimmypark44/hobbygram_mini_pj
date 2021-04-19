const express = require("express");
const validations = require("../../middlewares/validations");
const {
	commentUpload,
	commentEdit,
	commentDelete,
	showComment,
} = require("./controller");
const commentRouter = express.Router();

commentRouter.post("/comment/:postId", validations, commentUpload);
commentRouter.patch("/comment/:commentId", commentEdit);
commentRouter.delete("/comment/:commentId", commentDelete);
commentRouter.get("/comment/:postId", showComment);

module.exports = { commentRouter };
