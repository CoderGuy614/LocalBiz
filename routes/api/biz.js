const express = require("express");
const router = express.Router();

const { requireSignIn, isAuth, isAdmin } = require("../../middleware/auth");
const { create, bizById, read } = require("../../controllers/biz");
const { userById } = require("../../controllers/user");

router.get("/biz/:bizId", read);
router.post("/biz/create/:userId", requireSignIn, isAuth, create);

router.param("userId", userById);
router.param("bizId", bizById);

module.exports = router;
