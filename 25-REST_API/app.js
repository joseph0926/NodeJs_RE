import express from "express";
import bodyParser from "body-parser";
import { router as authRouter } from "./routes/auth.js";

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use("/api/v1/auth", authRouter);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "알수없는 에러가 발생하였습니다,,,";
  res.status(status).json({ message: message });
});

app.listen(5000);
