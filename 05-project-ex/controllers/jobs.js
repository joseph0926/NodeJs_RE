import asyncWrapper from "../middleware/async.js";
import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import NotFoundError from "../errors/not-found.js";

const getAllJobs = asyncWrapper(async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");

  res.status(StatusCodes.OK).json({
    message: "모든 직업을 불러오는데 성공하셨습니다",
    jobs,
    count: jobs.length,
  });
});

const getJob = asyncWrapper(async (req, res) => {
  const { userId } = req.user;
  const jobId = req.params.jobId;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`해당 직업(${jobId})을 찾을수없습니다,,,`);
  }

  res.status(StatusCodes.OK).json({
    message: "해당 직업을 불러오는데 성공하셨습니다",
    job,
  });
});

const createJob = asyncWrapper(async (req, res) => {
  req.body.createdBy = req.user.userId;
  console.log(req.user);

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({
    message: "직업 생성에 성공하셨습니다",
    job,
  });
});

const updateJob = asyncWrapper(async (req, res) => {
  const { company, position } = req.body;
  const { userId } = req.user;
  const jobId = req.params.jobId;

  if (company.trim() === "" || position.trim() === "") {
    throw new BadRequestError("입력값이 유효하지 않습니다,,,");
  }

  const job = await Job.findByIdAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    { new: true }
  );
  if (!job) {
    throw new NotFoundError(`해당 직업(${jobId})을 찾을수없습니다,,,`);
  }

  res.status(StatusCodes.OK).json({
    message: "해당 직업을 업데이트하는데 성공하셨습니다",
    job,
  });
});

const deleteJob = asyncWrapper(async (req, res) => {
  const { userId } = req.user;
  const jobId = req.params.jobId;

  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`해당 직업(${jobId})을 찾을수없습니다,,,`);
  }

  res.status(StatusCodes.OK).json({
    message: "해당 직업을 삭제하는데 성공하셨습니다",
  });
});

const jobController = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};

export default jobController;
