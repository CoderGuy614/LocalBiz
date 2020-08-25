const express = require("express");
const router = express.Router();

const { requireSignIn, isAuth, isAdmin } = require("../../middleware/auth");
const { create, itemById, read } = require("../../controllers/item");
const { userById } = require("../../controllers/user");

router.get("/item/:itemId", read);
router.post("/item/create/:userId", requireSignIn, isAuth, create);

router.param("userId", userById);
router.param("itemId", itemById);

module.exports = router;
