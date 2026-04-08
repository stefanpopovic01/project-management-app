const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // The person who triggered the action (e.g., who added the comment)
    actor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["task_moved", "comment_added", "member_invited", "task_assigned", "user_followed"],
        required: true
    },
    // Reference to the project where this happened
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: false 
    },
    message: {
        type: String,
        default: "",
        maxLength: [200, "Message must have less than 200 characters."]
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Indexing for performance
// Since you'll always be looking for "unread notifications for User X"
notificationSchema.index({ recipient: 1, isRead: 1 });

module.exports = mongoose.model("Notification", notificationSchema);