const express = require("express");
const router = express.Router();

const { register, login, logout, veifiyEmail } = require("../controllers/authController");

router.post("/register", register);
router.post("/verify-email", veifiyEmail);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
