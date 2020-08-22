const express = require("express");
const router = express.Router();

//Checks that the request belongs to the currently logged in user
const auth = require("../../middleware/auth");
const { userById, read, update, remove } = require("../../controllers/user");

// Get a registered user by their ID
router.get("/users/:userId", read);

//Update a User
router.put("/users/:userId", auth, update);

//Delete a User
router.delete("/users/:userId", auth, remove);

router.param("userId", userById);

module.exports = router;
