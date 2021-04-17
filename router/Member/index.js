const { Router } = require("express")
const MemberController = require("./controller")
const MemberRouter = Router()
const isValidation = require("../../middlewares/validations")
const isValidationwithBody = require("../../middlewares/validationswithbody")
// 자세한 코드는 controller에서 확인 가능

// 로그인 / 토큰 발행
MemberRouter.post("/login", MemberController.login)
// 회원가입
MemberRouter.post("/join", MemberController.join)
// 이미 있는 이메일인지 확인
MemberRouter.post("/checkEmail", MemberController.checkEmail)
MemberRouter.post("/getUser", isValidationwithBody, MemberController.getUser)

module.exports = MemberRouter
