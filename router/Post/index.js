const express = require("express");

const { postUpload, detail, editPost, deletePost } = require("./controller.js");
const validations = require("../../middlewares/validations");
const postRouter = express.Router();

postRouter.post("/post/:category", validations, postUpload);
postRouter.get("/post/:postId", detail);
postRouter.patch("/post/:postId", editPost);
postRouter.delete("/post/:postId", deletePost);
postRouter.post("/post/recommend/:postId", recommendPost);
postRouter.delete("/post/recommend/:postId", unrecommendPost);

module.exports = { postRouter };
