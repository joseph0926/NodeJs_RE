import { StatusCodes } from "http-status-codes";

import asyncWrapper from "../middleware/async.js";
import User from "../models/User.js";
import BadRequestError from "../errors/bad-request.js";
import UnauthenticatedError from "../errors/unauthenticated.js";

const signup = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError(
      "입력하신 값이 유효하지 않습니다, 다시한번 확인 부탁드립니다."
    );
  }

  const user = await User.create({ name, email, password });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    message: "회원가입 성공!",
    user: { userId: user._id, username: user.name, userEmail: user.email },
    token,
  });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError(
      "입력하신 값이 유효하지 않습니다, 다시한번 확인 부탁드립니다."
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("유효하지 않은 인증입니다.");
  }

  const isPasswordEqule = await user.comparePassword(password);
  if (!isPasswordEqule) {
    throw new UnauthenticatedError("유효하지 않은 비밀번호입니다.");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    message: "로그인 성공!",
    user: { userId: user._id, username: user.name, userEmail: user.email },
    token,
  });
});

const authController = {
  signup,
  login,
};

export default authController;
