const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");
const { auth, isProjectMember } = require("../middleware/authMiddleware");

router.get("/:projectId/tasks", auth, isProjectMember, taskController.getProjectTasks);
router.get("/userTasks/:id", auth, taskController.getAllUserTasks);
router.get("/:id", auth, taskController.getTask);
router.post("/", auth, taskController.createTask);
router.post("/:id/comments", auth, taskController.addComment);
router.patch("/:id", auth, taskController.updateTask);
router.patch("/:id/status", auth, taskController.updateTaskStatus);
router.patch("/:taskId/checklist/:itemId", auth, taskController.updateChecklistItem);
router.delete("/:id", auth, taskController.deleteTask); 

module.exports = router;
