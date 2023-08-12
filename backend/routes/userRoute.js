const express = require('express');
const { registerUser, loginUser, logoutUser, getUserProfile} = require('../controllers/userController');
const router = express.Router();

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/logout", logoutUser)

router.get("/user", getUserProfile)

module.exports = router;