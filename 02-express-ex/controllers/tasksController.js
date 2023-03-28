import Task from "../models/Task.js";
import asyncWrapper from "../middleware/async.js";
import createCustomError from "../error/custom-error.js";

// 데이터 모두 가져오기
const getAllTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.find({});
  res.status(201).json({ tasks });
});

// 생성
const createTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// 원하는 데이터 가져오기
const getSingleTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.id;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(createCustomError("해당 task를 찾을수없습니다", 404));
  }
  res.status(201).json({ task });
});

// 업데이트
const updateTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.id;
  const task = await Task.findByIdAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError("해당 task를 찾을수없습니다", 404));
  }
  res.status(201).json({ updatedTask: task });
});

// 삭제
const deleteTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.id;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return next(createCustomError("해당 task를 찾을수없습니다", 404));
  }
  res.status(201).json({ task, message: "삭제 성공!" });
});

export const controller = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};
