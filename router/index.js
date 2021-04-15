const { Router } = require("express");
const router = Router();
const { commentRouter } = require("../router/Comment");
const isVaildation = require("../middlewares/validations");

router.use("/", require("./Member"));
router.use("/", isVaildation, require("./Post"))
router.use(commentRouter);

module.exports = router;
