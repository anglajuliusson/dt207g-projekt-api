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