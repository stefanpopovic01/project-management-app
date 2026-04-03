const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.patch("/:id", userController.editUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;