const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { auth, isAccountOwner } = require("../middleware/authMiddleware");

router.get("/", auth, userController.getUsers);
router.get("/:id", auth, userController.getUser);
router.patch("/:id", auth, isAccountOwner, userController.editUser);



router.get("/followers/:id", auth, userController.getFollowers);
router.get("/following/:id", auth, userController.getFollowing);
router.patch("/follow/:id", auth, userController.follow);
router.patch("/unfollow/:id", auth, userController.unfollow);
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;