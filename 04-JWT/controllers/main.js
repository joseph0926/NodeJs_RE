import * as dotenv from "dotenv";
dotenv.config();
import asyncWrapper from "../middleware/async.js";
import CustomAPIError from "../errors/custom-error.js";
import jwt from "jsonwebtoken";

const login = asyncWrapper(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError("이메일 또는 비밀번호를 정확하게 작성해주세요.", 401);
  }

  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: "30d" });

  res.status(201).json({ message: "회원가입 성공!", token });
});

const dashboard = asyncWrapper(async (req, res) => {
  const { id, username } = req.user;

  const randNumber = Math.floor(Math.random() * 100) + 1;
  res.status(201).json({ message: `안녕하세요! ${username}님, 로그인을 성공하셨습니다. 당신의 번호는 ${randNumber}입니다.` });
});

const jwtController = {
  login,
  dashboard,
};

export default jwtController;
