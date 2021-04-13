const express = require("express");
const validations = require("../../middlewares/validations");
const { commentUpload, commentEdit } = require("./controller");
const commentRouter = express.Router();

commentRouter.post("/comment/:postId", validations, commentUpload);
commentRouter.get("/comment/:postId", commentUpload);
commentRouter.patch("/comment/:postId", commentEdit);

module.exports = { commentRouter };
