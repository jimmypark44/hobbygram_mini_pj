const Comment = require("../../models/comment");

//댓글 작성하기
const commentUpload = async (req, res) => {
	const userId = res.locals.user;
	const {
		body: { content },
	} = req;
	try {
		const comment = await Comment.create({
			user: userId,
			content,
		});
		res.send({
			comment,
			success: "true",
		});
	} catch (error) {
		res.send({
			errormessage: "댓글 작성 중 오류 발생했습니다.",
		});
	}
};

//댓글 수정하기
const commentEdit = async (req, res) => {
	const {
		params: { postId: id },
		body: content,
	} = req;

	await findByIdAndUpdate(id, { content });
	res.send({
		content,
	});
};

module.exports = { commentUpload, commentEdit };
