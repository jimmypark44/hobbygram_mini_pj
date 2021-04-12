const Post = require("../../models/post.js");

//글 작성하기
const upload = async (req, res) => {
	//login user정보
	//const { user } = res.locals.user;
	const {
		body: { title, content, category },
		//img: { path },
	} = req;
	try {
		let recommendCnt = 0;
		const newPost = await Post.create({
			//user,
			content,
			title,
			category,
			//img: path,
			recommendUser: [],
			recommendCnt: 0,
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
		const post = await Post.findById(id);
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
		res.send({ content });
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
			message: "삭제완료!",
		});
	} catch (error) {
		res.status(400).send({
			errormessage: "게시글 삭제 중 오류가 발생했습니다.",
		});
		console.log(error);
	}
};

module.exports = { deletePost, editPost, upload, detail };
