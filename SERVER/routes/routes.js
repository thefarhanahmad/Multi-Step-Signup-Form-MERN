const express = require("express");
const router = express.Router();
const { signup, getUser } = require("../controllers/signup");
const auth = require("../middlewares/auth");
const { createProfile, uploadAvatar } = require("../controllers/profile");

// routes defined
router.post("/signup", signup);
router.post("/profile", auth, createProfile);
router.post("/avatar", auth, uploadAvatar);
router.get("/user", auth, getUser);

module.exports = router;
