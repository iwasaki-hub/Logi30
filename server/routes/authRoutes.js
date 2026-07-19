const express = require("express");
const authMiddleware = require("../Middleware/authMiddleware");
const {
  register,
  login,
  logout,
  getMe,
} = require("../controllers/authController");
const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");

const router = express.Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);

module.exports = router;
