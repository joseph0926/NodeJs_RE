import express from "express";
import authData from "../controllers/auth.js";

export const router = express.Router();

const { signup } = authData;

router.post("/signup", signup);
