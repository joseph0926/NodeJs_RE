import express from "express";
import jwtController from "../controllers/main.js";
import authenticationMiddleware from "../middleware/auth.js";

export const router = express.Router();

const { login, dashboard } = jwtController;

router.post("/login", login);
router.get("/dashboard", authenticationMiddleware);
router.get("/dashboard", dashboard);
// router.post("signup");
