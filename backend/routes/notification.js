const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification")
const { auth } = require("../middleware/authMiddleware");

router.get("/", auth, notificationController.getNotifications);
router.get("/unread-count", auth, notificationController.getUnreadCount);
router.patch("/read-all", auth, notificationController.markAllRead);
router.patch("/:id", auth, notificationController.markAsRead);
router.delete("/:id", auth, notificationController.deleteNotification);

module.exports = router;