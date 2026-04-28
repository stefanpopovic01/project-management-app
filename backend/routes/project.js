const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project");
const { auth, isProjectMember, isProjectCreator } = require("../middleware/authMiddleware");


router.get("/assigned/:id", auth, projectController.getAssignedProjects); 
router.get("/user/:id", auth, projectController.getUserProjects);
router.get("/:id", auth, isProjectMember, projectController.getProject);
router.get("/:id/members", auth, isProjectMember, projectController.getProjectMembers);
router.post("/", auth, projectController.createProject);
router.post("/invite", auth, isProjectCreator, projectController.invite);
router.patch("/respond-invite", auth, projectController.respondInvite);
router.patch("/:id", auth, isProjectCreator, projectController.updateProject);
router.delete("/:id", auth, isProjectCreator, projectController.deleteProject);
router.delete("/:projectId/members/:userId", auth, isProjectCreator, projectController.removeMember);


module.exports = router;