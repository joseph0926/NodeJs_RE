import express from "express";

import { router as tasksRoute } from "./routes/tasks.js";

const app = express();

app.use(express.json());

app.use("/api/v1/tasks", tasksRoute);

const port = 5000;
app.listen(port, console.log(`서버가 포트번호 ${port}에서 정상작동 중 입니다.`));
