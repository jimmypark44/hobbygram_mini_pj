const { User } = require("../../models")
require("dotenv").config()
const jwt = require("jsonwebtoken")

// jwt 사용한 로그인과 회원가입
exports.login = async (req, res, next) => {
    const { email, password } = req.body
    if (typeof email !== "string") return res.status(400).send({ err: "이메일 형식이 틀렸습니다." })
    if (typeof password !== "string")
        return res.status(400).send({ err: "비밀번호가 형식이 틀렸습니다." })
    try {
        const user = await User.findOne().and([{ email }, { password }])
        if (!user) return res.status(400).send({ err: "이메일 혹은 비밀번호가 일치하지 않습니다." })
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY)
        return res.send({ result: { user: { token: token } } })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ err: err.message })
    }
}

exports.join = async (req, res, next) => {
    const { name, email, password, role } = req.body

    if (typeof name !== "string") return res.status(400).send({ err: "이름 형식이 틀립니다." })
    if (typeof email !== "string") return res.status(400).send({ err: "이메일 형식이 틀렸습니다." })
    if (typeof password !== "string")
        return res.status(400).send({ err: "비밀번호가 형식이 틀렸습니다." })
    if (typeof role !== "string") return res.status(400).send({ err: "직함 형식이 틀렸습니다." })

    const user = await User.findOne({ email })
    if (user) return res.status(400).send({ err: "이미 존재하는 사용자입니다." })

    const NewUser = new User({ ...req.body })
    try {
        await NewUser.save()
        return res.send({ success: true })
    } catch (err) {
        return res.status(400).send({ err: err.message })
    }
}

exports.checkEmail = async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (user) {
        return res.send({ success: false })
    } else {
        return res.send({ success: true })
    }
}
