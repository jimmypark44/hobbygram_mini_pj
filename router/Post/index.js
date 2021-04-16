const { Router } = require("express");
const PostController = require("./controller");
const PostRouter = Router();
const validations = require("../../middlewares/validations");
const upload = require("../../middlewares/imgUpload");

// PostRouter.post("/post/uploadImg", validations, upload.single("img"), PostController.uploadImg)
PostRouter.post(
	"/post/write",
	validations,
	upload.single("img"),
	PostController.postUpload
);
PostRouter.get("/post/:category", PostController.showCategoryPosts);
PostRouter.get("/post", PostController.showAllPosts);
PostRouter.get("/post/detail/:postId", PostController.detail);
PostRouter.patch("/post/:postId", PostController.editPost);
PostRouter.delete("/post/:postId", PostController.deletePost);
PostRouter.post(
	"/post/recommend/:postId",
	validations,
	PostController.recommendPost
);
// PostRouter.delete("/post/recommend/:postId", validations, PostController.unrecommendPost);

module.exports = PostRouter;
