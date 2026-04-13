const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required."],
        match: [/^\S+@\S+\.\S+$/, 'Email not in valid format.']
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minLength: [5, "Password must have minimum 5 characters."],
    },
    firstName: {
        type: String,
        required: [true, "First name is required."],
        minLength: [2, "Name must have minimum 2 characters"],
        maxLength: [50, "Name must have less than 50 characters."]
    },
    lastName: {
        type: String,
        // required: [true, "Last name is required."],
        minLength: [2, "Last name must have minimum 2 characters"],
        maxLength: [50, "Last name must have less than 50 characters."]
    },
    position: {
        type: String,
        default: "",
        maxLength: [50, "Position must have less than 50 characters."]
    },
    company: {
        type: String,
        default: "",
        maxLength: [50, "Company must have less than 50 characters."]
    },
    location: {
        type: String,
        default: "",
        maxLength: [50, "Location must have less than 50 characters."]
    },
    bio: {
        type: String,
        default: "",
        maxLength: [250, "Bio must have less than 50 characters."]
    },
    avatarUrl: {
        type: String,
        default: ""
    },
    bannerUrl: {
        type: String,
        default: ""
    },
    skills: {
        type: [String],
        default: []
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    refreshToken: {
        type: String, 
        default: null
    }

}, { timestamps: true } )

userSchema.pre("save", async function (next) {
    if (this.email) {
        this.email = this.email.toLowerCase();
    }
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();

})

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// This prevents the "duplicate follow" issue from SQL indexes
// followSchema.index({ follower: 1, following: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);
