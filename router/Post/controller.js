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
