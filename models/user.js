const { Schema, model, Types } = require("mongoose")

// 사용자 db의 형태
const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        introduce: { type: String },
    },
    {
        // createdAt, updatedAt 자동 생성
        timestamps: true,
    }
)

const User = model("User", UserSchema)
module.exports = User
