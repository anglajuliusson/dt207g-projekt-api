const express = require("express");
const boduParser = require("body-parser");
const authRoutes = require("./routes/authRoutes"); // Inkludera authRoute
require("dotenv").config(); // Laddar variabler från .env-filen

const app = express();
const port = process.env.PORT || 3000; // Hämtar port från variabel eller använder 3000 som standard
app.use(boduParser.json());

// Routes
app.use("/api", authRoutes);

// Starta applikation
app.listen(port, () => {
    console.log(`Server running at http://localhost${port}`);
});