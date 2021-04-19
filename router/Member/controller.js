const { User } = require("../../models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// jwt 사용한 로그인과 회원가입
exports.login = async (req, res, next) => {
	const { email, password } = req.body;
	if (typeof email !== "string")
		return res.status(400).send({ err: "이메일 형식이 틀렸습니다." });
	if (typeof password !== "string")
		return res.status(400).send({ err: "비밀번호가 형식이 틀렸습니다." });
	try {
		const user = await User.findOne().and([{ email }, { password }]);
		if (!user)
			return res
				.status(400)
				.send({ err: "이메일 혹은 비밀번호가 일치하지 않습니다." });
		const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY);
		return res.send({ result: { user: { token: token, name: user.name } } });
	} catch (err) {
		console.log(err);
		return res.status(400).send({ err: err.message });
	}
};

exports.join = async (req, res, next) => {
	const { name, email, password, password2 } = req.body;

	if (typeof name !== "string")
		return res.status(400).send({ err: "이름 형식이 틀립니다." });
	if (typeof email !== "string")
		return res.status(400).send({ err: "이메일 형식이 틀렸습니다." });
	if (typeof password !== "string")
		return res.status(400).send({ err: "비밀번호가 형식이 틀렸습니다." });

	const user = await User.findOne({ email });
	if (user) return res.status(400).send({ err: "이미 존재하는 사용자입니다." });
	if (password !== password2)
		return res.status(400).send({ err: "비밀번호가 불일치합니다" });

	const NewUser = new User({ ...req.body });
	try {
		//bycrpt
		bcrypt.genSalt(saltRounds, function (err, salt) {
			bcrypt.hash(NewUser.password, salt, function (err, hash) {
				// Store hash in your password DB.
				NewUser.password = hash;
				NewUser.save();
			});
		});
		return res.send({ success: true });
	} catch (err) {
		return res.status(400).send({ err: err.message });
	}
};

exports.checkEmail = async (req, res, next) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		return res.send({ success: false });
	} else {
		return res.send({ success: true });
	}
};

exports.getUser = async (req, res, next) => {
	const userId = res.locals.user;
	// const token = res.locals.token
	const user = await User.findOne({ _id: userId });
	if (user) {
		return res.send({ name: user.name, email: user.email });
	} else {
		return res.status(400).send({ err: "해당 아이디가 없습니다" });
	}
};
