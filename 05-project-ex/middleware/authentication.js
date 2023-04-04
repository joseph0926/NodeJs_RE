import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncWrapper from "./async.js";
import UnauthenticatedError from "../errors/unauthenticated.js";

const authenticationMiddleware = asyncWrapper(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("토큰이 존재하지 않습니다.");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // const user = User.findById(decoded.id).select("-password")
    // req.user = user;

    const { userId, name } = decoded;
    req.user = { userId, name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("접근 권한이 존재하지 않습니다.");
  }
});

export default authenticationMiddleware;
