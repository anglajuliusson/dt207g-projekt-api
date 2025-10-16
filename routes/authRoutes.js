// Route för registrering och inloggning

const express = require("express");
const router = express.Router();

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
        const user = new User ({ username, password });
        await user.save(); // Spara användare
    
        res.status(201).json({ message: "User created"});

    } catch (erro) {
        res.status(500).json({error: "Server error"});
    }
});

// Logga in användare
router.post("/login", async (req, res) => {
    console.log("Login called...");
});

module.exports = router;