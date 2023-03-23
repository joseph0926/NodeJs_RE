import path from "path";
import express from "express";

import { dirname as rootDir } from "../helpers/path";

// express의 도움을 받아 파일을 쪼개어 라우트를 설정하는 방법
export const router = express.Router();

// 미들웨어의 use 메서드는 인자로 라우트를 받는다
router.get("/", (req, res, next) => {
  // send 메서드를 통해 응답을 보낼수있다
  // res.send("<h1>HomePage</h1>");

  // html 파일 제공하기
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});
