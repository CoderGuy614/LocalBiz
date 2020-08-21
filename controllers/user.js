const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/user");

router.post("/api/signup", signup);
