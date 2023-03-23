import path from "path";
import express from "express";
import bodyParser from "body-parser";

import { router as adminRoutes } from "./routes/admin";
import { router as shopRoutes } from "./routes/shop";
import { dirname as rootDir } from "./helpers/path";

const app = express();

// node만 사용했을때 작업했던, 복잡한 req body 파싱을 쉽게하도록 도와줌
app.use(bodyParser.urlencoded({ extended: false }));

// 정적 파일 제공하기
app.use(express.static(path.join(rootDir, "public")));

// express 특징 -> 단일 요청 헨들러 대신, 요청을 처리할 다양한 함수들을 연결(정의)함
app.use((req, res, next) => {
  console.log("express 시작");
  // next함수는 다음 미들웨어로 이동할수있도록 해주는 함수다
  next();
});

// 다른 파일(라우트)를 사용하는 방법
app.use("/admin", adminRoutes);
// 공통 경로를 추가해줄수있음
app.use(shopRoutes);

// 에러 라우트
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(5000);
