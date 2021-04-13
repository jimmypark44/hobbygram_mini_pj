const express = require("express");
const mongoose = require("mongoose");
const router = require("./router");
const morgan = require("morgan");
const path = require("path");
const { postRouter } = require("./router/Post");
const { commentRouter } = require("./router/Comment");
class App {
	constructor() {
		this.app = express();
		this.setDB();
		this.setMiddleWare();
		this.setRouter();
		this.set404Error();
		this.setError();
	}
	setDB() {
		mongoose
			.connect("mongodb://localhost:27017/hobbygram", {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				ignoreUndefined: true,
				useFindAndModify: false,
			})
			.then(() => console.log("db connected"))
			.catch((err) => console.log(err));
	}
	setMiddleWare() {
		// 서버에 들어오는 정보를 파악하기 위한 middleware
		this.app.use(morgan("combined"));
		// 스태틱 사용을 위한 경로 설정
		this.app.use(express.static(path.join(__dirname, "uploads")));
		// 프로필 사진 업로드 때 사용하기 위한 경로 설정
		this.app.use("/img", express.static(path.join(__dirname, "uploads")));
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(express.json());
	}
	setRouter() {
		this.app.use(router);
		this.app.get("/", (req, res) => {
			res.send("hello");
		});
		//postrouter로 정의된 라우트들을 사용
		this.app.use(postRouter);
		this.app.use(commentRouter);
	}
	set404Error() {
		this.app.use((req, res, _) => {
			res.status(404).send("404");
		});
	}
	setError() {
		this.app.use((err, req, res, _) => {
			console.log(err);
			res.status(500).send("500");
		});
	}
}

module.exports = App;
