// Route för registrering och inloggning

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); // Inkludera mongoose
require("dotenv").config();

// Anslut till MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to database...");
})

// User model
const user = require("../models/User");

// Registrera ny användare
router.post("/register", async (req, res) => {
    console.log("Register called...");

    try {
        let { username, password } = req.body;

        // Validera input, kolla vilka fält som saknas
        const missingFields = [];
        if (!username) missingFields.push("username"); // Om användarnamn saknas
        if (!password) missingFields.push("password"); // Om lösenord saknas

        // Skriv ut det saknade värdet
        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Invalid input, send ${missingFields.join(", ")}`}); // Felmeddelande om alla fält inte är ifyllda
        }

        // Correct - save user
        const user = new User({ username, password });
        await user.save(); // Spara användare

        res.status(201).json({ message: "User created"});

    } catch (error) {
        res.status(500).json({ error: "Server error" + error}); // Felmeddelande
    }
});

// Logga in användare
router.post("/login", async (req, res) => {
    console.log("Login called...");

    try {
        let { username, password } = req.body;

        // Validera input, kolla vilka fält som saknas
        const missingFields = [];
        if (!username) missingFields.push("username"); // Om användarnamn saknas
        if (!password) missingFields.push("password"); // Om lösenord saknas

        // Skriv ut det saknade värdet
        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Invalid input, send ${missingFields.join(", ")}`}); // Felmeddelande om alla fält inte är ifyllda
        }

        // Kontroller att username och password är rätt
        if (username === "user" && password === "password") {
            res.status(200).json({ message: "Login successful" });
        } else {
            res.status(401).json({ error: "Invalid username or password"}); // Felmeddelande om fel användarnamn eller lösenrod
        }

    } catch(error) {
        res.status(500).json({ error: "Server error" + error}); // Felmeddelande
    }
});

module.exports = router;