const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const { userById, read } = require("../../controllers/user");

// Get a registered user by their ID
router.get("/users/:userId", read);

router.param("userId", userById);

module.exports = router;
