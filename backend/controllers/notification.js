const Notification = require("../models/Notification")

async function getNotifications(req, res) {
  try {
    const notifications = await Notification.find({ recipient: req.user.id })
      .populate("actor", "firstName lastName avatarUrl")
      .populate("project", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getUnreadCount(req, res) {
  try {
    const count = await Notification.countDocuments({ 
      recipient: req.user.id, 
      isRead: false 
    });
    res.status(200).json({ unreadCount: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function markAsRead(req, res) {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user.id },
      { isRead: true },
      { new: true }
    );

    if (!notification) return res.status(404).json({ message: "Notification not found" });

    res.status(200).json({ message: "Marked as read", notification });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function markAllRead(req, res) {
  try {
    await Notification.updateMany(
      { recipient: req.user.id, isRead: false },
      { $set: { isRead: true } }
    );
    res.status(200).json({ message: "All notifications marked as read" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteNotification(req, res) {
  try {
    const result = await Notification.findOneAndDelete({ 
      _id: req.params.id, 
      recipient: req.user.id 
    });

    if (!result) return res.status(404).json({ message: "Notification not found" });

    res.status(200).json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getNotifications, getUnreadCount, markAsRead, markAllRead, deleteNotification };