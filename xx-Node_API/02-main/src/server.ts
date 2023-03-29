import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";

const app = express();

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1", router);

export default app;
