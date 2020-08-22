const express = require("express");
const router = express.Router();

//Checks that the request belongs to the currently logged in user
const { requireSignIn, isAuth } = require("../../middleware/auth");

const { userById, read, update, remove } = require("../../controllers/user");

// Get a registered user by their ID
router.get("/users/:userId", read);

//Update a User
router.put("/users/:userId", requireSignIn, isAuth, update);

//Delete a User
router.delete("/users/:userId", requireSignIn, isAuth, remove);

router.param("userId", userById);

module.exports = router;
