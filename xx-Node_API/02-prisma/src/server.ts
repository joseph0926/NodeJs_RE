import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log("express를 이용한 서버 생성");
  res.status(200);
  res.json({ message: "server starting,,," });
});

export default app;
