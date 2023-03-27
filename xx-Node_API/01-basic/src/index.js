// 프레임워크 없이 바닐라 node로만 생성한 서버

// const http = require("http");

// const server = http.createServer((req, res) => {
//   if (req.method === "GET" && req.url === "/") {
//     console.log("server starting,,,");
//     res.end();
//   }
// });

// server.listen(5000, () => {
//   console.log("서버가 포트번호 5000에서 정상 작동중입니다");
// });

const app = require("./server");

app.listen(5000, () => {
  console.log("서버가 포트번호 5000에서 정상 작동중입니다");
});
