const express = require("express");

const { upload, detail, editPost, deletePost } = require("./controller.js");

const postRouter = express.Router();

postRouter.post("/post/:category", upload);
postRouter.get("/post/:postId", detail);
postRouter.patch("/post/:postId", editPost);
postRouter.delete("/post/:postId", deletePost);

module.exports = { postRouter };
