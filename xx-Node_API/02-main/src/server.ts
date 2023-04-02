import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { login, signup } from "./controllers/user";

const app = express();

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes (protected)
app.use("/api/v1", protect, router);
// routes (user)
app.post("/user/signup", signup);
app.post("/user/login", login);

// error handler
app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "인증 오류" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "유효하지 않은 입력값입니다" });
  } else {
    res
      .status(500)
      .json({ message: `에러가 발생하였습니다,,, ${err.message}` });
  }
});

export default app;
