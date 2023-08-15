const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUser,
  changePassword,
  forgotPassword,
} = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/user", protect, getUserProfile);

router.patch("/updateuser", protect, updateUser);

router.patch("/changepassword", protect, changePassword);

router.post("/forgotpassword", protect, forgotPassword);

module.exports = router;
