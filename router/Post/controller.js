const Post = require("../../models/post.js");
const User = require("../../models/user");
const getCurrentDate = require("./calDate");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//글 작성하기
const postUpload = async (req, res) => {
	//login user정보
	const userId = res.locals.user;
	const {
		params: { category },
		body: { title, content },
		//img: { path },
	} = req;
	//TODO: save image, path
	try {
		//Login 한 유저의 정보에서 user name 가져오는 코드
		const userInfo = await User.findOne({ _id: userId });
		const user = userInfo.name;
		//DB.create 코드
		const newPost = await Post.create({
			title,
			content,
			user,
			category,
			//img: path,
			recommendUser: [],
		});
		res.send({ newPost });
	} catch (error) {
		res.status(400).send({
			errormessage: "게시글 업로드 중 오류가 발생했습니다.",
		});
		console.log(error);
	}
};

//상세페이지DB 보내주기
const detail = async (req, res) => {
	const {
		params: { postId: id },
	} = req;
	try {
		const post = await Post.findById(id).populate("comment");
		res.send({ post });
	} catch (error) {
		res.status(400).send({
			errormessage: "게시글을 불러오는 중 오류가 발생했습니다.",
		});
		console.log(error);
	}
};

//수정하기
const editPost = async (req, res) => {
	const {
		params: { postId: id },
		body: { content },
	} = req;
	try {
		//TODO: 파일도 수정할 수 있도록 추가 예정
		await Post.findByIdAndUpdate(id, { content });
		res.send({ content, success: "true" });
	} catch (error) {
		res.status(400).send({
			errormessage: "게시글 수정 중 오류가 발생했습니다.",
		});
		console.log(error);
	}
};

//삭제하기
const deletePost = async (req, res) => {
	const {
		params: { postId: id },
	} = req;
	try {
		await Post.findByIdAndDelete(id);
		res.send({
			success: "true",
		});
	} catch (error) {
		res.status(400).send({
			errormessage: "게시글 삭제 중 오류가 발생했습니다.",
		});
		console.log(error);
	}
};

module.exports = { deletePost, editPost, postUpload, detail };
