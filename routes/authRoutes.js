// Route för registrering och inloggning

const express = require("express");
const router = express.Router();

// Registrera ny användare
router.post("/register", async (req, res) => {
    console.log("Register called...");
});

// Logga in användare
router.post("/login", async (req, res) => {
    console.log("Login called...");
});

module.exports = router;