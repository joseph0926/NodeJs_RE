import express from "express";
import authController from "../controllers/auth.js";

export const router = express.Router();

const { signup, login } = authController;

router.post("/signup", signup);
router.post("/login", login);
