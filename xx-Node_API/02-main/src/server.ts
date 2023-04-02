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

// sync error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(501).json({ message: `에러,,, ${err.message}` });
});

export default app;
