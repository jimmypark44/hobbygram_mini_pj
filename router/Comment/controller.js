const Comment = require("../../models/comment");
const Post = require("../../models/post");
const User = require("../../models/user");

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

module.exports = { commentUpload, commentEdit };
