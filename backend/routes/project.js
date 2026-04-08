const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project");
const { auth } = require("../middleware/authMiddleware");

router.get("/:id", auth, projectController.getProject);
router.get("/user/:id", auth, projectController.getUserProjects);
router.post("/", auth, projectController.createProject);
router.post("/invite", auth, projectController.invite);
router.patch("/respond-invite", auth, projectController.respondInvite);
router.patch("/:id", auth, projectController.updateProject);
router.delete("/:id", auth, projectController.deleteProject);


module.exports = router;