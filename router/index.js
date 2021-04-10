const { Router } = require("express")
const router = Router()
const isVaildation = require("../middlewares/vaildations")

router.use("/", require("./Member"))
router.use("/post", isVaildation, require("./Post"))

module.exports = router
