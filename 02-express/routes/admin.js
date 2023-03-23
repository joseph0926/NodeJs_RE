import path from "path";
import express from "express";

import { dirname as rootDir } from "../helpers/path";

// express의 도움을 받아 파일을 쪼개어 라우트를 설정하는 방법
export const router = express.Router();

// 인자로 받은 라우트는 지정한 라우트만이 아닌, 지정한 라우트로 시작하는 모든 경로에 대해서 응답을 보냄,, 따라서 위쪽에 더 디테일한 경로에 대한 미들웨어를 작성해야함
router.get("/add-product", (req, res, next) => {
  res.send("<form action='/admin/add-product' method='post'><input type='text' name='title'><button type='submit'>Submit</button></form>");

  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/add-product", (req, res, next) => {
  // 요청을 받을수있음 (여기서는 위의 form에서 작성된것)
  console.log(req.body);
  res.redirect("/");
});
