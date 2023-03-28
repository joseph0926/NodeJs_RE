import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./db/connect.js";

import { router as tasksRoute } from "./routes/tasks.js";
import errorHandler from "./middleware/error-handler.js";

const app = express();

// 프론트엔드와 연결
app.use(express.static("./public"));

app.use(express.json());

app.use("/api/v1/tasks", tasksRoute);

// 가장 큰 범위의 404 에러
app.use((req, res) => {
  res.status(404).send("404! Page Not Found");
});
// 추가적인 에러 헨들링
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    const db = await connectDB(process.env.MONGO_URL);
    if (db) {
      console.log("DB 연결 성공!");
      app.listen(port, console.log(`서버가 포트번호 ${port}에서 정상작동 중 입니다.`));
    } else {
      const error = new Error("DB 연결에 실패하였습니다,,,");
      error.status = 401;
      throw error;
    }
  } catch (error) {
    console.log(error);
  }
};

start();
