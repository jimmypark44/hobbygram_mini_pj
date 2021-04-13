const express = require("express");
const validations = require("../../middlewares/validations");
const { commentUpload, commentEdit } = require("./controller");
const commentRouter = express.Router();

commentRouter.post("/comment/:postId", validations, commentUpload);
commentRouter.patch("/comment/:commentId", commentEdit);

module.exports = { commentRouter };
