const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Project title is required."],
        trim: true,
        minLength: [2, "Project title must have minimum 2 characters"],
        maxLength: [100, "Project title must have less than 100 characters."]
    },
    description: {
        type: String,
        default: "",
        maxLength: [500, "Description must have less than 500 characters."]
    },
    status: {
        type: String,
        enum: ["planning", "active", "review", "archived"],
        default: "planning"
    },
    deadline: {
        type: Date
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    deletedAt: {
        type: Date,
        default: null
    },
    members: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            invitedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true 
            },
            role: { 
                type: String, 
                enum: ['viewer', 'member', 'admin'], 
                default: 'member' 
                },
            status: {
                type: String,
                enum: ['pending', 'accepted', 'declined', 'expired'],
                default: 'pending'
            },
            invitedAt: { type: Date, default: Date.now },
            expiresAt: { type: Date },
            acceptedAt: { type: Date, default: null }
        }
    ]

}, { timestamps: true } );

// Query Middleware: Automatically filter out deleted projects
// This ensures that 'find' queries don't show deleted items by default

projectSchema.pre(/^find/, function(next) {
    this.find({ deletedAt: null });
    next();
});

module.exports = mongoose.model("Project", projectSchema);
