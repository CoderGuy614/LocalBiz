const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const { userById, read, update } = require("../../controllers/user");

// Get a registered user by their ID
router.get("/users/:userId", read);

//Update a User
router.put("/users/:userId", update);

// //Delete a User
// router.delete("/user/:userId", remove);

router.param("userId", userById);

module.exports = router;
