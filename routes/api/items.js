const express = require("express");
const router = express.Router();

const { requireSignIn, isAuth, isAdmin } = require("../../middleware/auth");
const { create, itemById, read, listItems } = require("../../controllers/item");
const { userById } = require("../../controllers/user");
const { bizById } = require("../../controllers/biz");

router.get("/item/:itemId", read);
router.get("/items/:bizId", listItems);
router.post("/item/create/:userId", requireSignIn, isAuth, create);

router.param("userId", userById);
router.param("itemId", itemById);
router.param("bizId", bizById);

module.exports = router;
