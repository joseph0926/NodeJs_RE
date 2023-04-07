const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");
const testUser = require("../middleware/test-user");
const { register, login, updateUser } = require("../controllers/auth");
const rateLimiter = require("express-rate-limit");

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 60,
  max: 10,
  message: {
    msg: "최대 시도횟수를 넘었습니다,, 15분후에 다시 시도해주세요",
  },
});

router.post("/register", register);
router.post("/login", apiLimiter, login);
router.patch("/updateUser", authenticateUser, testUser, updateUser);

module.exports = router;
