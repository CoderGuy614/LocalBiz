const express = require("express");
const router = express.Router();

const { requireSignIn, isAuth, isAdmin } = require("../../middleware/auth");
const { itemById } = require("../../controllers/item");
const { userById } = require("../../controllers/user");
const { bizById } = require("../../controllers/biz");
const { create, read } = require("../../controllers/message");

router.get("/messages/:bizId", read);
router.post(
  "/messages/create/:bizId/:itemId/:userId",

  create
);

router.param("userId", userById);
router.param("itemId", itemById);
router.param("bizId", bizById);

module.exports = router;
