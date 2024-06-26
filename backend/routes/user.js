const express = require("express");

const {
  signupUser,
  loginUser
} = require("../controllers/userController")

const router = express.Router();

// for signing up account
router.post("/Login", loginUser)

// for logging in
router.post("/Signup", signupUser)

module.exports = router;