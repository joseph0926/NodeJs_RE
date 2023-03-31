import express from "express";
import jobController from "../controllers/jobs.js";

export const router = express.Router();

const { getAllJobs, getJob, createJob, updateJob, deleteJob } = jobController;

router.get("/job", getAllJobs);
router.get("/job/:jobId", getJob);
router.post("/job/:jobId", createJob);
router.put("/job/:jobId", updateJob);
router.delete("/job/:jobId", deleteJob);
