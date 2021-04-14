const { Router } = require("express");
const router = Router();
const { postRouter } = require("../router/Post");
const { commentRouter } = require("../router/Comment");
const isVaildation = require("../middlewares/validations");

router.use("/", require("./Member"));
// router.use("/post", isVaildation, require("./Post"))
router.use(postRouter);
router.use(commentRouter);

module.exports = router;
