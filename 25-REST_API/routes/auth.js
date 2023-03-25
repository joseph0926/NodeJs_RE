import express from "express";
import authData from "../controllers/auth.js";

export const router = express.Router();

const { signup, login } = authData;

router.post("/signup", signup);
router.post("/login", login);
