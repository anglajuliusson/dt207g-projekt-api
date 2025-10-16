const mongoose = require("mongoose"); // Inkludera mongoose
const bcrypt = require("bcrypt"); // Inkludera bcrypt

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.new
    }
});

// Hasha lösenord
userSchema.pre("save", async function(next) {
    try {
        if(this.isnew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }

        next();
    } catch (error) {
        next(error);
    }
});