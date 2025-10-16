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

// Registrera ny användare
userSchema.statics.register = async function ( username, password) {
    try {
        const user = new this({ username, password });
        await user.save(); // Spara användare
        return user;
    } catch (error) {
        throw error;
    }
};

// Jämför hashat lösenord
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password); // Är det hashade lösenordet likadant som det inmatade lösenordet
    } catch (error) {
        throw error;
    }
};

// Logga in
userSchema.statics.login = async function (username, password) {
    try {
        const user = await this.findOne({ username });

        // Fel användarnamn
        if(!user) {
            throw new Error("Incorrect username or password");
        }

        const isPasswordCorrect = await user.comparePassword(password);
        // Fel lösenord
        if(!isPasswordCorrect) {
            throw new Error("Incorrect username or passsword");
        }
        // Rätt uppgifter, logga in
        return user;
        
    } catch (error) {
        throw error;
    }
}