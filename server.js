const express = require("express");
const cors = require("cors");
const boduParser = require("body-parser");
const authRoutes = require("./routes/authRoutes"); // Inkludera authRoute
const dishRoutes = require("./routes/dishRoutes"); // inkludera dishRoutes
const jwt = require("jsonwebtoken"); // Inkludera JWT
require("dotenv").config(); // Laddar variabler från .env-filen

const app = express();
const port = process.env.PORT || 3000; // Hämtar port från variabel eller använder 3000 som standard
app.use(cors());
app.use(boduParser.json());

// Validera token
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Token

    if(token == null) res.status(401).json({ message: "Not authorized for this route - token missing" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username ) => {
        if(err) return res.status(403).json({ message: "Invalid JWT" }); // Felmeddelande vid ogiltigt JWT

        req.username = username;
        next();
    });
}

// Routes
app.use("/api", authRoutes);

// Skyddade routes
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad route" });
});

app.use("/api", dishRoutes);

// Starta applikation
app.listen(port, () => {
    console.log(`Server running at http://localhost${port}`);
});