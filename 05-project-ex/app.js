import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

import helmet from "helmet";
import cors from "cors";
import xss from "xss";
import rateLimiter from "express-rate-limit";

import connectDB from "./db/connect.js";

import { router as authRouter } from "./routes/auth.js";
import { router as jobRouter } from "./routes/jobs.js";

import authenticationMiddleware from "./middleware/authentication.js";
import notFound from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

const app = express();

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json());
app.use(helmet()), app.use(cors()), app.use(xss());

// extra packages

// routes
app.use("/api/v1", authRouter);
app.use("/api/v1", authenticationMiddleware, jobRouter);

// error handler
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
