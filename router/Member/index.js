const { Router } = require("express")
const MemeberController = require("./controller")
const MemberRouter = Router()
const isVaildation = require("../../middlewares/vaildations")
// 자세한 코드는 controller에서 확인 가능

// 로그인 / 토큰 발행
MemberRouter.post("/login", MemeberController.login)
// 회원가입
MemberRouter.post("/join", MemeberController.join)
// 이미 있는 이메일인지 확인
MemberRouter.post("/checkEmail", MemeberController.checkEmail)

module.exports = MemberRouter
