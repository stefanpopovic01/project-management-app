const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth")
const { loginLimiter } = require("../middleware/rateLimiter");

router.post("/register", authController.Register);
router.post("/login", loginLimiter, authController.Login);

module.exports = router;