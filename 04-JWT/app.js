import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { router as mainRouter } from "./routes/main.js";
import cors from "cors";
import morgan from "morgan";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFound from "./middleware/not-found.js";

const app = express();

// middleware
app.use(express.static("./public"));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1", mainRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
