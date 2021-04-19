const Comment = require("../../models/comment");
const Post = require("../../models/post");
const User = require("../../models/user");

//댓글 조회하기
const showComment = async (req, res) => {
	const {
		params: { postId: id },
	} = req;
	try {
		const post = await Post.findById(id).populate({
			path: "comment",
			options: { sort: { createdAt: -1 } },
		});
		const comments = post.comment;
		res.send({
			comments,
		});
	} catch (error) {
		res.send({
			errormessage: "댓글을 불러오는 중 오류가 발생했습니다.",
		});
		console.log(error);
	}
};

//댓글 작성하기
const commentUpload = async (req, res) => {
	const userId = res.locals.user;
	const {
		params: { postId: id },
		body: { content },
	} = req;
	try {
		const post = await Post.findById(id);
		//Login 한 유저의 정보에서 user name 가져오는 코드
		const userInfo = await User.findOne({ _id: userId });
		const user = userInfo.name;
		//DB.create 코드
		const comment = await Comment.create({
			user,
			content,
		});
		post.save();
		post.comment.push(comment);
		res.send({
			comment,
			success: "true",
		});
	} catch (error) {
		res.send({
			errormessage: "댓글 작성 중 오류 발생했습니다.",
		});
		console.log(error);
	}
};

//댓글 수정하기
const commentEdit = async (req, res) => {
	const {
		params: { commentId: id },
		body: { content },
	} = req;

	await Comment.findByIdAndUpdate(id, { content });
	res.send({
		content,
	});
};

//댓글 삭제하기
const commentDelete = async (req, res) => {
	const {
		params: { commentId: id },
	} = req;

	await Comment.findByIdAndDelete(id);
	res.send({
		result: "success",
	});
};
module.exports = { commentUpload, commentEdit, commentDelete, showComment };
