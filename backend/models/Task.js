const mongoose = require("mongoose");

const checklistItemSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Checklist text is required."],
        trim: true,
        maxLength: [100, "Checklist text should have less than 100 characters."]
    },
    isDone: {
        type: Boolean,
        default: false
    },
    position: {
        type: Number,
        default: 0
    }
}, { timestamps: true } );

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    body: {
        type: String,
        required: [true, "Body text is required."],
        maxLength: [200, "Body text should have less than 200 characters."],
        default: ""
    },

}, { timestamps: true } )


const taskSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Project"
    },
    title: {
        type: String,
        required: [true, "Title is required."],
        minLength: [2, "Title should have minimum 2 characters. "],
        maxLength: [150, "Title should have less than 150 characters."]
    },
    description: {
        type: String,
        default: "",
        maxLength: [500, "Description should have less than 500 characters."]
    },
    status: {
        type: String,
        enum: ["planned", "progress", "done"],
        default: "planned"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    dueDate: {
        type: Date
    },
    // Useful for Kanban drag-and-drop ordering
    position: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
        default: []
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    },
    checklist: [checklistItemSchema],
    comments: [commentSchema]

}, {timestamps: true })

// Ensure find queries ignore soft-deleted tasks
taskSchema.pre(/^find/, function(next) {
    this.find({ deletedAt: null });
    next();
});

module.exports = mongoose.model("Task", taskSchema);