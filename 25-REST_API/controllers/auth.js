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

const authData = {
  signup,
};

export default authData;
