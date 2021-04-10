const App = require("./app")

// 3000번 포트
const server = new App().app
server.listen("3000", () => {
    console.log("server is listening")
})
