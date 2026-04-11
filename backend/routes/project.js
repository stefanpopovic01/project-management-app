const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project");
const { auth } = require("../middleware/authMiddleware");

router.get("/user/", auth, projectController.getUserProjects);
router.get("/assigned/", auth, projectController.getAssignedProjects);
router.get("/:id", auth, projectController.getProject);
router.get("/:id/members", auth, projectController.getProjectMembers);
router.post("/", auth, projectController.createProject);
router.post("/invite", auth, projectController.invite);
router.patch("/respond-invite", auth, projectController.respondInvite);
router.patch("/:id", auth, projectController.updateProject);
router.delete("/:id", auth, projectController.deleteProject);
router.delete("/:projectId/members/:userId", auth, projectController.removeMember);


module.exports = router;