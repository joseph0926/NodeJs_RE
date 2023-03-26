import express from "express";
import { controller } from "../controllers/tasksController.js";

const { getAllTasks, getSingleTask, createTask, updateTask, deleteTask } = controller;

export const router = express.Router();

router.get("/", getAllTasks);
router.post("/", createTask);
router.get("/:id", getSingleTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
