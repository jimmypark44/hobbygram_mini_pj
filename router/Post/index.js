const express = require("express");

const { postUpload, detail, editPost, deletePost } = require("./controller.js");
const validations = require("../../middlewares/validations");
const postRouter = express.Router();

postRouter.post("/post/:category", validations, postUpload);
postRouter.get("/post/:postId", detail);
postRouter.patch("/post/:postId", editPost);
postRouter.delete("/post/:postId", deletePost);

module.exports = { postRouter };
