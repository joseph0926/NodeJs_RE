import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const signup = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });
    const token = createJWT(user);
    res.json({ message: "회원가입 성공!", token });
  } catch (error) {
    error.type = "input";
    next(error);
  }
};

export const login = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePasswords(req.body.password, user.password);
  if (!isValid) {
    res.status(401).json({ message: "비밀번호가 일치하지 않습니다" });
  }

  const token = createJWT(user);
  res.json({ message: "로그인 성공!", token });
};
