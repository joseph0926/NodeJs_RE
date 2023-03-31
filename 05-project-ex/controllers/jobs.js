import asyncWrapper from "../middleware/async.js";

const getAllJobs = asyncWrapper((req, res) => {});

const getJob = asyncWrapper((req, res) => {});

const createJob = asyncWrapper((req, res) => {});

const updateJob = asyncWrapper((req, res) => {});

const deleteJob = asyncWrapper((req, res) => {});

const jobController = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};

export default jobController;
