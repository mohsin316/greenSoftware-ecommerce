const express = require("express");
const router = express.Router();
const { signUp, login, logout } = require("../controller/authController");
const { handleRefreshToken } = require("../controller/refreshTokenController");

// signup
router.post("/signup", signUp);

// login
router.post("/login", login);

// logout
router.post("/logout", logout);

// get new access token
router.get("/refresh", handleRefreshToken);

module.exports = router;
