const Post = require("../../models/post.js");
const User = require("../../models/user.js");
// const getCurrentDate = require("./calDate");
const multer = require("multer");

//multer를 이용한 파일업로드 middleware, 분리 필요한가?
// exports.upload = multer({ dest: "uploads/" });

// //글 작성하기
// exports.uploadImg = async (req, res) => {
//     const img = req.file.path
//     res.send({ img })
// }

exports.postUpload = async (req, res) => {
    if (!res.locals.user) {
        const {
            body: { title, content, category },
        } = req;
        //TODO: save image, path
        try {
            //Login 한 유저의 정보에서 user name 가져오는 코드
            // const userInfo = await User.findOne({ _id: userId });
            // const user = userInfo.name;
            // DB.create 코드
            if (!req.file) {
                const newPost = await Post.create({
                    title,
                    content,
                    // user,
                    category,
                });
                return res.send({ newPost });
            }
            console.log(req.file.path)
            const img = req.file.path;
            // 서버에서는 '/', 윈도우에서는 '\\'
            const temp = img.split("/")[1];
            const fullimgpath = "http://15.164.164.65/" + temp;

            const newPost = await Post.create({
                title,
                content,
                // user,
                category,
                img: fullimgpath,
            });
            return res.send({ newPost });
        } catch (error) {
            if (error instanceof multer.MulterError) {
                res.status(400).send({
                    errormessage: "파일 업로드 중 오류가 발생했습니다.",
                });
            } else {
                res.status(400).send({
                    errormessage: "게시글 업로드 중 오류가 발생했습니다.",
                });
            }
            console.log(error);
        }

    }

    //login user정보
    const userId = res.locals.user;
    const {
        body: { title, content, category },
    } = req;
    //TODO: save image, path
    try {
        //Login 한 유저의 정보에서 user name 가져오는 코드
        const userInfo = await User.findOne({ _id: userId });
        const user = userInfo.name;
        // DB.create 코드
        if (!req.file) {
            const newPost = await Post.create({
                title,
                content,
                user,
                category,
            });
            return res.send({ newPost });
        }
        console.log(req.file.path)
        const img = req.file.path;
        // 서버에서는 '/', 윈도우에서는 '\\'
        const temp = img.split("/")[1];
        const fullimgpath = "http://15.164.164.65/" + temp;

        const newPost = await Post.create({
            title,
            content,
            user,
            category,
            img: fullimgpath,
        });
        return res.send({ newPost });
    } catch (error) {
        if (error instanceof multer.MulterError) {
            res.status(400).send({
                errormessage: "파일 업로드 중 오류가 발생했습니다.",
            });
        } else {
            res.status(400).send({
                errormessage: "게시글 업로드 중 오류가 발생했습니다.",
            });
        }
        console.log(error);
    }
};

exports.showCategoryPosts = async (req, res) => {
    let { page } = req.query
    page = page || 1
    const { category } = req.params;
    try {
        const post = await Post.find({ category: category })
            .populate([{ path: "comment", select: ["user"] }])
            .sort({ createdAt: -1 })
            .skip((page - 1) * 9)
            .limit(9)
        post.forEach(eachPost => eachPost["commentCnt"] = eachPost.comment.length)
        res.send({ post });
    } catch (error) {
        res.status(400).send({
            errormessage: "게시글을 불러오는 중 오류가 발생했습니다.",
        });
        console.log(error);
    }
};

exports.showAllPosts = async (req, res) => {
    let { page } = req.query
    page = page || 1
    try {
        const post = await Post.find({})
            .populate([{ path: "comment", select: ["user"] }])
            .sort({ createdAt: -1 })
            .skip((page - 1) * 9)
            .limit(9)
        post.forEach(eachPost => eachPost["commentCnt"] = eachPost.comment.length)
        res.send({ post });
    } catch (error) {
        res.status(400).send({
            errormessage: "게시글을 불러오는 중 오류가 발생했습니다.",
        });
        console.log(error);
    }
};

//상세페이지DB 보내주기
exports.detail = async (req, res) => {
    const { postId } = req.params;
    try {
        var post = await Post.findById(postId).populate([
            { path: "comment", select: ["user", "content", "createdAt"] },
        ]);
        post["commentCnt"] = post.comment.length
        res.send({ post });
    } catch (error) {
        res.status(400).send({
            errormessage: "게시글을 불러오는 중 오류가 발생했습니다.",
        });
        console.log(error);
    }
};

//수정하기
exports.editPost = async (req, res) => {
    const {
        params: { postId: id },
        body: { title, content },
    } = req;
    try {
        //TODO: 파일도 수정할 수 있도록 추가 예정
        await Post.findByIdAndUpdate(id, { title, content });
        res.send({ title, content, success: "true" });
    } catch (error) {
        res.status(400).send({
            errormessage: "게시글 수정 중 오류가 발생했습니다.",
        });
        console.log(error);
    }
};

//삭제하기
exports.deletePost = async (req, res) => {
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

// 추천하기
exports.recommendPost = async (req, res) => {
    const {
        params: { postId: id },
    } = req;
    // const { postId } = req.params
    // const userId = res.locals.user
    const userId = res.locals.user;
    console.log(userId);
    try {
        const post = await Post.findOne({ _id: id });
        if (post.recommendUser.includes(userId)) {
            await Post.updateOne(
                { _id: id },
                {
                    $pull: { recommendUser: userId },
                    $inc: { recommendCnt: -1 },
                }
            );
            return res.send({ success: false });
        }
        await Post.updateOne(
            { _id: id },
            {
                $push: { recommendUser: userId },
                $inc: { recommendCnt: 1 },
            }
        );
        return res.send({ success: true });
    } catch (error) {
        res.status(400).send({
            errormessage: "게시글 추천 중 오류가 발생했습니다.",
        });
        console.log(error);
    }
};

// exports.unrecommendPost = async (req, res) => {
//     const { postId } = req.params;
//     const userId = res.locals.user;

//     try {
//         const post = await Post.findOne({ _id: postId });
//         if (!post.recommendUser.includes(userId)) {
//             return res.status(400).send({ err: "추천을 안 한 상태입니다." });
//         }
//         await Post.updateOne(
//             { _id: postId },
//             {
//                 $pull: { recommendUser: userId },
//                 $inc: { recommendCnt: -1 },
//             }
//         );
//         res.send({ success: true });
//     } catch (error) {
//         res.status(400).send({
//             errormessage: "게시글 추천 중 오류가 발생했습니다.",
//         });
//         console.log(error);
//     }
// };
