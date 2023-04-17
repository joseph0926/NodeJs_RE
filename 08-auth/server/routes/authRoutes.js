const express = require("express");
const router = express.Router();

const { register, login, logout, veifiyEmail } = require("../controllers/authController");
const { authenticateUser } = require("../middleware/authentication");

router.post("/register", register);
router.post("/verify-email", veifiyEmail);
router.post("/login", login);
router.delete("/logout", authenticateUser, logout);

module.exports = router;
