const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");
const { auth } = require("../middleware/authMiddleware");

router.get("/:projectId/tasks", auth, taskController.getProjectTasks);
router.get("/", auth, taskController.getAllUserTasks);
router.get("/:id", auth, taskController.getTask);
router.post("/", auth, taskController.createTask);
router.post("/:id/comments", auth, taskController.addComment);
router.patch("/:id", auth, taskController.updateTask);
router.delete("/:id", auth, taskController.deleteTask); 

module.exports = router;