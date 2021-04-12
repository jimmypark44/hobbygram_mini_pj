const { Post } = require("../../models");
const post = require("../../models/post");

exports.upload = async (req, res) => {
	//login user정보
	const { user } = res.locals.user;
	const {
		body: { title, content, category },
		img: { path },
	} = req;
	let {};
	try {
		const newPost = await post.create({
			user,
			content,
			title,
			img: path,
			category,
			recommendCnt,
			commentCnt,
		});
		res.send({ newPost });
	} catch (error) {
		res.status(400).send({
			errormessage: "게시글 업로드 중 오류가 발생했습니다.",
		});
		console.log(error);
	}
};

exports.detail = async (req, res) => {
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

exports.editPost = async (req, res) => {
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

exports.deletePost = async (req, res) => {
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
