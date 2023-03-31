import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

import connectDB from "./db/connect.js";

import { router as authRouter } from "./routes/auth.js";
import { router as jobRouter } from "./routes/jobs.js";

import notFound from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

const app = express();

// error handler

app.use(express.json());
// extra packages

// routes
app.use("/api/v1", authRouter);
app.use("/api/v1", jobRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    const db = await connectDB(process.env.MONGO_URL);
    console.log("DB에 연결되었습니다.");
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
