// DB호출을 위한 인덱스 파일
const DB = {}
DB.User = require("./user")
DB.Post = require("./post")
module.exports = DB
