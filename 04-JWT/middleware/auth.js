import dotenv from "dotenv";
dotenv.config();
import asyncWrapper from "./async.js";
import CustomAPIError from "../errors/custom-error.js";

const authenticationMiddleware = asyncWrapper(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("토큰이 존재하지 않습니다.", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomAPIError("접근 권한이 존재하지 않습니다.", 401);
  }
});

export default authenticationMiddleware;
