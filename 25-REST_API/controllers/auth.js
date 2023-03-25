import jwt from "jsonwebtoken";
import pkg from "bcryptjs";
const { hash, compare } = pkg;

import { prisma } from "../prisma/server.js";
import { validateCredentials } from "./validations.js";

const signup = async (req, res, next) => {
  const { email, password, name } = req.body;

  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    const error = new Error("이미 사용중인 이메일입니다");
    error.status = 422;
    throw error;
  }

  const formData = {
    email,
    password,
    name,
  };
  try {
    validateCredentials(formData);
  } catch (error) {
    console.log(error);
    return error;
  }

  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  res.status(201).json({ message: "회원가입 성공!", userId: user.id });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let loadedUser;

  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (!existingUser) {
    const error = new Error("해당 이메일로 가입된 정보를 찾을 수 없습니다");
    error.status = 401;
    throw error;
  }

  loadedUser = existingUser;

  const isPasswordEquel = await compare(password, loadedUser.password);
  if (!isPasswordEquel) {
    const error = new Error("비밀번호가 일치하지 않습니다.");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign({ email: loadedUser.email, userId: loadedUser.id.toString() }, process.env.JWT_KEY, { expiresIn: "1h" });

  res.status(200).json({ token, userId: loadedUser.id.toString() });
};

const authData = {
  signup,
  login,
};

export default authData;
