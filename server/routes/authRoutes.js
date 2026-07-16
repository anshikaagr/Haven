const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getProfile,
  changePassword,
  deleteAccount,
} = require("../controllers/authController");

router.get("/profile", protect, getProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put(
  "/change-password",
  protect,
  changePassword
);
router.delete(
  "/delete-account",
  protect,
  deleteAccount
);

module.exports = router;