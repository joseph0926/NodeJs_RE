import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFound from "./middleware/not-found.js";
import connectDB from "./db/connect.js";
import { router as productRoutes } from "./routes/products.js";

const app = express();

// middleware
app.use(express.json());

// routes

app.use("/api/v1/products", productRoutes);

// error
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    const db = await connectDB(process.env.MONGO_URL);
    if (db) {
      console.log("DB 연결 성공!");
      app.listen(
        port,
        console.log(`서버가 포트번호 ${port}에서 정상작동 중 입니다.`)
      );
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
